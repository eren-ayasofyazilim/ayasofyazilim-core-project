"use client";

import type { UniRefund_CRMService_Merchants_UpdateMerchantDto } from "@ayasofyazilim/saas/CRMService";
import { $UniRefund_CRMService_Merchants_MerchantBaseDto } from "@ayasofyazilim/saas/CRMService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import type {
  AutoFormInputComponentProps,
  DependenciesType,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import AutoForm, {
  AutoFormSubmit,
  CustomCombobox,
  DependencyType,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { SectionLayoutContent } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { useRouter } from "next/navigation";
import type { CRMServiceServiceResource } from "src/language-data/CRMService";
import type { PutMerchantBase } from "../types";
import { handleUpdateSubmit } from "../utils";

function MerchantForm({
  languageData,
  partyName,
  partyId,
  taxOfficeList: taxOfficesEnum,
  merchantList,
  merchantData: individualData,
}: {
  languageData: CRMServiceServiceResource;
  partyName: "merchants";
  partyId: string;
  taxOfficeList: { name: string; id: string }[];
  merchantList: { name: string; id: string }[];
  merchantData: UniRefund_CRMService_Merchants_UpdateMerchantDto | undefined;
}) {
  const router = useRouter();
  const schema = createZodObject(
    $UniRefund_CRMService_Merchants_MerchantBaseDto,
    ["typeCode", "taxOfficeId", "parentId"],
  );
  const dependencies: DependenciesType = [
    {
      sourceField: "typeCode",
      type: DependencyType.HIDES,
      targetField: "parentId",
      when: (typeCode: string) => typeCode !== "STORE",
    },
    {
      sourceField: "typeCode",
      type: DependencyType.REQUIRES,
      targetField: "parentId",
      when: (typeCode: string) => typeCode === "STORE",
    },
  ];

  function handleSubmit(formData: PutMerchantBase["data"]["requestBody"]) {
    void handleUpdateSubmit(
      partyName,
      {
        action: "merchant-base",
        data: {
          requestBody: formData,
          id: partyId,
        },
      },
      router,
    );
  }
  return (
    <SectionLayoutContent sectionId="merchant-base">
      <AutoForm
        dependencies={dependencies}
        fieldConfig={{
          taxOfficeId: {
            renderer: (props: AutoFormInputComponentProps) => {
              return (
                <CustomCombobox<{ name: string; id: string }>
                  childrenProps={props}
                  list={taxOfficesEnum}
                  selectIdentifier="id"
                  selectLabel="name"
                />
              );
            },
          },
          parentId: {
            renderer: (props: AutoFormInputComponentProps) => {
              return (
                <CustomCombobox<{ name: string; id: string }>
                  childrenProps={props}
                  list={merchantList}
                  selectIdentifier="id"
                  selectLabel="name"
                />
              );
            },
          },
        }}
        formClassName="pb-40"
        formSchema={schema}
        onSubmit={(values: PutMerchantBase["data"]["requestBody"]) => {
          if (values?.typeCode === "STORE" && !values.parentId) {
            return;
          }
          handleSubmit(values);
        }}
        values={individualData}
      >
        <AutoFormSubmit className="float-right">
          {languageData.Save}
        </AutoFormSubmit>
      </AutoForm>
    </SectionLayoutContent>
  );
}

export default MerchantForm;
