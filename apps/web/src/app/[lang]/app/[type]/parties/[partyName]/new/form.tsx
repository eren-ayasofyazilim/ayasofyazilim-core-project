"use client";

import { toast } from "@/components/ui/sonner";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { getEnumId, type TableData } from "@repo/ui/utils/table/table-utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { addressSchemaByData } from "@repo/ui/utils/table/form-schemas";
import type { CRMServiceServiceResource } from "src/language-data/CRMService";
import { getBaseLink } from "src/utils";
import { isPhoneValid, splitPhone } from "src/utils-phone";
import type { CreatePartiesDto } from "../../table-data";
import { dataConfigOfParties } from "../../table-data";
import { createPartyRow } from "../action";
import type { PartiesCreateDTOType, PartyNameType } from "../../types";

export default function Form({
  partyName,
  taxOfficesEnum,
  citiesEnum,
  languageData,
}: {
  partyName: PartyNameType;
  taxOfficesEnum: { name: string; id: string }[];
  citiesEnum: { name: string; id: string }[];
  languageData: CRMServiceServiceResource;
}) {
  const searchParams = useSearchParams();
  const parentId = searchParams.get("parentId");
  const router = useRouter();
  const [_formData] = useState<TableData>(dataConfigOfParties[partyName]);

  function formSchemaByData() {
    const config = dataConfigOfParties[partyName];
    const address = addressSchemaByData([], citiesEnum, [
      "country",
      "terriority",
    ]);

    const convertors = {
      ...config.createFormSchema.convertors,
      taxOfficeId: {
        type: "enum",
        data: taxOfficesEnum.map((i) => i.name),
      },
      address: {
        ...address.convertors,
      },
    };
    const formSubPositions = {
      ...config.createFormSchema.formSubPositions,
      address: address.subPositions,
    };
    return createZodObject(
      config.createFormSchema.schema,
      config.createFormSchema.formPositions,
      convertors,
      formSubPositions,
    );
  }

  const handleSave = async (formData: CreatePartiesDto) => {
    const isValid = isPhoneValid(formData.telephone.localNumber);
    if (!isValid) {
      return;
    }
    const phoneData = splitPhone(formData.telephone.localNumber);
    formData.telephone = { ...formData.telephone, ...phoneData };
    const createformData: PartiesCreateDTOType = {
      taxOfficeId: getEnumId(taxOfficesEnum, formData.taxOfficeId),
      typeCode: parentId
        ? dataConfigOfParties[partyName].subEntityType
        : "HEADQUARTER",
      parentId,
      entityInformationTypes: [
        {
          organizations: [
            {
              ...formData.organization,
              contactInformations: [
                {
                  telephones: [{ ...formData.telephone, primaryFlag: true }],
                  emails: [{ ...formData.email, primaryFlag: true }],
                  addresses: [
                    {
                      ...formData.address,
                      country: formData.address.country || "NULL",
                      terriority: formData.address.terriority || "NULL",
                      city: getEnumId(citiesEnum, formData.address.city),
                      primaryFlag: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    try {
      const response = await createPartyRow(partyName, createformData);
      if (response.status === 200) {
        const successMsg =
          `${dataConfigOfParties[partyName].translationKey}.New.Success` as keyof typeof languageData;
        toast.success(successMsg);
        router.push(getBaseLink(`/app/admin/parties/${partyName}`));
      } else {
        const errorMsg =
          `${dataConfigOfParties[partyName].translationKey}.New.Fail` as keyof typeof languageData;
        toast.error(errorMsg);
      }
    } catch (error) {
      const errorMsg =
        `${dataConfigOfParties[partyName].translationKey}.New.Fail` as keyof typeof languageData;
      toast.error(errorMsg);
    }
  };

  return (
    <AutoForm
      className="grid-col-1 grid grid-rows-1 gap-2 space-y-0 lg:grid-cols-3 lg:grid-rows-2"
      fieldConfig={{
        address: {
          className: "row-span-2",
        },
        organization: {
          className: "row-span-2",
        },
        email: {
          emailAddress: {
            inputProps: {
              type: "email",
            },
          },
        },
        telephone: {
          localNumber: {
            fieldType: "phone",
            displayName: "Telephone Number",
            inputProps: {
              showLabel: true,
            },
          },
        },
      }}
      formClassName="pb-4"
      formSchema={formSchemaByData()}
      onSubmit={(val) => {
        void handleSave(val as CreatePartiesDto);
      }}
    >
      <AutoFormSubmit className="float-right">
        {languageData.Save}
      </AutoFormSubmit>
    </AutoForm>
  );
}
