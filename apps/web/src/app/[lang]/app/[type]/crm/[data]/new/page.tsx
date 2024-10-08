/* eslint-disable @typescript-eslint/no-unsafe-member-access -- TODO: we need to fix this*/
"use client";
import { toast } from "@/components/ui/sonner";
import type { UniRefund_LocationService_Cities_CityDto } from "@ayasofyazilim/saas/LocationService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { TableData } from "@repo/ui/utils/table/table-utils";
import { getResourceDataClient } from "src/language-data/CRMService";
import { useLocale } from "src/providers/locale";
import { getBaseLink } from "src/utils";
import { isPhoneValid, splitPhone } from "src/utils-phone";
import { getCities } from "../../../action";
import { dataConfigOfCrm } from "../../data";

export interface CreateOrganizationDto {
  organization: Record<string, string>;
  telephone: {
    areaCode: string;
    localNumber: string;
    ituCountryCode: string;
    primaryFlag: boolean;
    typeCode: 0 | 1 | 2 | 3;
  };
  address: {
    addressLine: string;
    city: string;
    terriority: string;
    postalCode: string;
    country: string;
    fullAddress: string;
    primaryFlag: boolean;
    typeCode: 0 | 1;
  };
  email: {
    emailAddress: string;
    primaryFlag: boolean;
    typeCode: 0 | 1;
  };
}

export default function Page({
  params,
}: {
  params: {
    data: string;
    lang: string;
    id: string;
  };
}) {
  const router = useRouter();
  const [_formData] = useState<TableData>(
    dataConfigOfCrm.companies.pages[params.data],
  );
  const { resources } = useLocale();
  const languageData = getResourceDataClient(resources, params.lang);
  // const [countries, setCountries] =
  //   useState<UniRefund_LocationService_Countries_CountryDto[]>();
  const [cities, setCities] =
    useState<UniRefund_LocationService_Cities_CityDto[]>();

  // useEffect(() => {
  //   setLoading(true);
  //   getCountries({ maxResultCount: 500, sorting: "name" })
  //     .then((response) => {
  //       if (response.type === "success") {
  //         setCountries(response.data.items || []);
  //       } else if (response.type === "api-error") {
  //         toast.error(response.message);
  //       } else {
  //         toast.error("Fatal error");
  //       }
  //     })
  //     .finally(() => setLoading(false));
  // }, []);

  useEffect(() => {
    void getCities({ maxResultCount: 500, sorting: "name" }).then(
      (response) => {
        if (response.type === "success") {
          setCities(response.data.items || []);
        } else if (response.type === "api-error") {
          toast.error(response.message);
        } else {
          toast.error("Fatal error");
        }
      },
    );
  }, []);

  function formSchemaByData() {
    const config = dataConfigOfCrm.companies.pages[params.data];
    if (config.createFormSchema) {
      config.createFormSchema.schema.properties.address.properties.country = {
        type: "integer",
        format: "int32",
        enum: ["Turkey"],
      };
      config.createFormSchema.schema.properties.address.properties.city = {
        type: "integer",
        format: "int32",
        enum: cities?.map((city) => city.name),
      };
    }
    return createZodObject(
      config.createFormSchema?.schema,
      config.createFormSchema?.formPositions,
      undefined,
      config.createFormSchema?.formSubPositions,
    );
  }

  const handleSave = async (formData: CreateOrganizationDto) => {
    const isValid = isPhoneValid(formData.telephone.localNumber);
    if (!isValid) {
      return;
    }
    const phoneData = splitPhone(formData.telephone.localNumber);
    formData.telephone = { ...formData.telephone, ...phoneData };
    const createformData = {
      taxOfficeId: "a3bf0c31-47ef-ba8c-9840-3a14ca207817",
      typeCode: 0,
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
      const response = await fetch(getBaseLink(`api/crm/${params.data}`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createformData),
      });
      if (response.ok) {
        toast.success(`${params.data} added successfully`);
        router.push(getBaseLink(`/app/admin/crm/${params.data}`));
      } else {
        const errorData = (await response.json()) as {
          message: string;
        };
        toast.error(errorData.message || `Failed to add ${params.data}`);
      }
    } catch (error) {
      toast.error(`An error occurred while saving the ${params.data}`);
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
        void handleSave(val as CreateOrganizationDto);
      }}
    >
      <AutoFormSubmit className="float-right">
        {languageData.Save}
      </AutoFormSubmit>
    </AutoForm>
  );
}
