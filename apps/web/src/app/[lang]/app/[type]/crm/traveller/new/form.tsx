"use client";

import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import type { UniRefund_TravellerService_Travellers_CreateWithComponentsTravellerDto as travellerCreateDTOType } from "@ayasofyazilim/saas/TravellerService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm, {
  AutoFormSubmit,
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
        city: {
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
        toast.error(response.message || `Failed to add Traveller`);
      } else {
        toast.success(`Traveller added successfully`);
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

  return (
    <Card className="h-full w-full flex-1 overflow-auto p-5">
      <AutoForm
        className="grid grid-flow-row  gap-4 lg:grid-cols-3 lg:grid-rows-1"
        fieldConfig={{
          telephone: {
            localNumber: {
              fieldType: "phone",
              displayName: "Telephone Number",
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
        }}
        formSchema={formSchemaByData()}
        onSubmit={(val) => {
          void SaveTraveller(val as CreateTravellerDTO);
        }}
      >
        <AutoFormSubmit className="float-right">
          {languageData.Save}
        </AutoFormSubmit>
      </AutoForm>
    </Card>
  );
}
