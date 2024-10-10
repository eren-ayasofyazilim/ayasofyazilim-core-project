"use client";

import { toast } from "@/components/ui/sonner";
import type { UniRefund_TravellerService_Travellers_CreateWithComponentsTravellerDto as travellerCreateDTOType } from "@ayasofyazilim/saas/TravellerService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm, {
  AutoFormSubmit,
  createFieldConfigWithResource,
  mergeFieldConfigs,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { useRouter } from "next/navigation";
import type { TravellerServiceResource } from "src/language-data/TravellerService";
import { getBaseLink } from "src/utils";
import { isPhoneValid, splitPhone } from "src/utils-phone";
import { createTravellerWithComponents } from "../actions";
import type { CreateTravellerDTO } from "../data";
import {
  createTravellerSchema,
  formPositions,
  formSubPositions,
} from "../data";

export default function Form({
  countriesEnum,
  citiesEnum,
  languageData,
}: {
  countriesEnum: { name: string; code2: string }[];
  citiesEnum: { name: string; id: string }[];
  languageData: TravellerServiceResource;
}) {
  const router = useRouter();

  function formSchemaByData() {
    const convertors = {
      address: {
        country: {
          type: "enum",
          data: countriesEnum.map((i) => i.name),
        },
        terriority: {
          type: "enum",
          data: citiesEnum.map((i) => i.name),
        },
      },
      personalIdentificationCommonDatas: {
        residenceCountryCode2: {
          type: "enum",
          data: countriesEnum.map((i) => i.name),
        },
        nationalityCountryCode2: {
          type: "enum",
          data: countriesEnum.map((i) => i.name),
        },
      },
    };
    return createZodObject(
      createTravellerSchema,
      formPositions,
      convertors,
      formSubPositions,
    );
  }

  const SaveTraveller = async (formData: CreateTravellerDTO) => {
    const isValid = isPhoneValid(formData.telephone.localNumber);
    if (!isValid) {
      return;
    }
    const phoneData = splitPhone(formData.telephone.localNumber);
    formData.telephone = { ...formData.telephone, ...phoneData };
    const createformData: travellerCreateDTOType = {
      entityInformationTypes: [
        {
          individuals: [
            {
              name: {
                ...formData.name,
              },
              personalSummaries: [
                {
                  ...formData.personalSummaries,
                },
              ],
              contactInformations: [
                {
                  telephones: [{ ...formData.telephone, primaryFlag: true }],
                  emails: [{ ...formData.email, primaryFlag: true }],
                  addresses: [
                    {
                      ...formData.address,
                      primaryFlag: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      personalIdentificationCommonDatas: [
        {
          ...formData.personalIdentificationCommonDatas,
          residenceCountryCode2: getCountryEnumCode(
            countriesEnum,
            formData.personalIdentificationCommonDatas.residenceCountryCode2,
          ),
          nationalityCountryCode2: getCountryEnumCode(
            countriesEnum,
            formData.personalIdentificationCommonDatas.nationalityCountryCode2,
          ),
        },
      ],
      personalPreferencesTypes: [
        {
          ...formData.personalPreferencesTypes,
        },
      ],
    };
    try {
      const response = await createTravellerWithComponents({
        requestBody: createformData,
      });
      if (response.type === "error" || response.type === "api-error") {
        toast.error(response.message || languageData["Travellers.New.Error"]);
      } else {
        toast.success(languageData["Travellers.New.Succes"]);
        router.push(getBaseLink(`/app/admin/crm/traveller`));
      }
    } catch (error) {
      toast.error(`An error occurred while saving the Traveller`);
    }
  };

  function getCountryEnumCode(
    data: { name: string; code2: string }[],
    value: string,
  ) {
    return data.find((item) => item.name === value)?.code2 || "";
  }

  const translatedForm = createFieldConfigWithResource({
    schema: createTravellerSchema,
    resources: languageData,
    name: "",
  });

  return (
    <AutoForm
      className="grid grid-flow-row  gap-4 space-y-0 lg:grid-cols-3 lg:grid-rows-1"
      fieldConfig={mergeFieldConfigs(translatedForm, {
        telephone: {
          localNumber: {
            fieldType: "phone",
            inputProps: {
              showLabel: true,
            },
          },
        },
        email: {
          emailAddress: {
            inputProps: {
              type: "email",
            },
          },
        },
        address: {
          className: "row-span-2",
        },
        personalIdentificationCommonDatas: {
          className: "row-span-2",
        },
      })}
      formSchema={formSchemaByData()}
      onSubmit={(val) => {
        void SaveTraveller(val as CreateTravellerDTO);
      }}
      stickyChildren
    >
      <AutoFormSubmit className="float-right py-4">
        {languageData["Travellers.Save"]}
      </AutoFormSubmit>
    </AutoForm>
  );
}
