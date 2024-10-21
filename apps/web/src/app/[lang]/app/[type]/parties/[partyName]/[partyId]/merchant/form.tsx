"use client";

import type { UniRefund_CRMService_Merchants_UpdateMerchantDto } from "@ayasofyazilim/saas/CRMService";
import { $UniRefund_CRMService_Merchants_MerchantBaseDto } from "@ayasofyazilim/saas/CRMService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import type { DependenciesType } from "@repo/ayasofyazilim-ui/organisms/auto-form";
import AutoForm, {
  AutoFormSubmit,
  DependencyType,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { SectionLayoutContent } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { getEnumId, getEnumName } from "@repo/ui/utils/table/table-utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMerchantsApi } from "src/app/[lang]/app/actions/CrmService/actions";
import type { CRMServiceServiceResource } from "src/language-data/CRMService";
import type { PutMerchantBase } from "../types";
import { handleUpdateSubmit } from "../utils";

function MerchantForm({
  languageData,
  partyName,
  partyId,
  taxOfficesEnum,
  merchantData: individualData,
}: {
  languageData: CRMServiceServiceResource;
  partyName: "merchants";
  partyId: string;
  taxOfficesEnum: { name: string; id: string }[];
  merchantData: UniRefund_CRMService_Merchants_UpdateMerchantDto | undefined;
}) {
  const [merchants, setMerchants] = useState<
    { name: string; id: string }[] | undefined
  >();
  const router = useRouter();

  const schema = createZodObject(
    $UniRefund_CRMService_Merchants_MerchantBaseDto,
    ["typeCode", "taxOfficeId", "parentId"],
    {
      taxOfficeId: {
        type: "enum",
        data: taxOfficesEnum.map((i) => i.name),
      },
      parentId: {
        type: "enum",
        data: merchants?.map((i) => i.name),
      },
    },
  );
  const dependencies: DependenciesType = [
    {
      sourceField: "typeCode",
      type: DependencyType.HIDES,
      targetField: "parentId",
      when: (typeCode: string) => typeCode !== "STORE",
    },
  ];

  function getMerchantList() {
    void getMerchantsApi().then((res) => {
      if (res.type === "success") {
        setMerchants(
          res.data.items?.map((item) => ({
            name: item.name || "",
            id: item.id || "",
          })) || [],
        );
      }
    });
  }
  useEffect(() => {
    if (individualData?.typeCode === "STORE" && !merchants) {
      getMerchantList();
    }
  }, []);
  return (
    <SectionLayoutContent sectionId="merchant-base">
      <AutoForm
        dependencies={dependencies}
        formClassName="pb-40"
        formSchema={schema}
        onParsedValuesChange={(values) => {
          if (values.typeCode === "STORE" && !merchants) {
            getMerchantList();
          }
        }}
        onSubmit={(values: PutMerchantBase["data"]["requestBody"]) => {
          if (values?.typeCode === "STORE" && !values.parentId) {
            return;
          }

          void handleUpdateSubmit(
            partyName,
            {
              action: "merchant-base",
              data: {
                requestBody: {
                  ...values,
                  taxOfficeId: getEnumId(
                    taxOfficesEnum,
                    values?.taxOfficeId || "",
                  ),
                  parentId:
                    (values?.typeCode === "STORE" &&
                      merchants &&
                      values.parentId &&
                      getEnumId(merchants, values.parentId || "")) ||
                    undefined,
                },
                id: partyId,
              },
            },
            router,
          );
        }}
        values={{
          ...individualData,
          taxOfficeId: getEnumName(
            taxOfficesEnum,
            individualData?.taxOfficeId || "",
          ),
          parentId:
            (merchants &&
              getEnumName(merchants, individualData?.parentId || "")) ||
            "",
        }}
      >
        <AutoFormSubmit className="float-right">
          {languageData.Save}
        </AutoFormSubmit>
      </AutoForm>
    </SectionLayoutContent>
  );
}

export default MerchantForm;
