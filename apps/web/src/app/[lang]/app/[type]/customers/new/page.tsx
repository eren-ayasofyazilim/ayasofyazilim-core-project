/* eslint-disable @typescript-eslint/no-unsafe-member-access -- TODO: we need to fix this*/
"use client";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getResourceDataClient } from "src/language-data/CustomersService";
import { useLocale } from "src/providers/locale";
import type { TableData } from "src/utils";
import { getBaseLink } from "src/utils";
import { isPhoneValid, splitPhone } from "src/utils-phone";
import { dataCustomers } from "../(main)/data";

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
    lang: string;
    id: string;
  };
}) {
  const router = useRouter();
  const [_formData] = useState<TableData>(
    dataCustomers.customers.pages.customers,
  );
  const { resources } = useLocale();
  const languageData = getResourceDataClient(resources, params.lang);
  const handleSave = async (formData: CreateOrganizationDto) => {
    const isValid = isPhoneValid(formData.telephone.localNumber);
    if (!isValid) {
      return;
    }
    const phoneData = splitPhone(formData.telephone.localNumber);
    formData.telephone = { ...formData.telephone, ...phoneData };
    const createformData = {
      entityInformationTypes: [
        {
          organizations: [
            {
              ...formData.organization,
              contactInformations: [
                {
                  telephones: [{ ...formData.telephone, primaryFlag: true }],
                  emails: [{ ...formData.email, primaryFlag: true }],
                  addresses: [{ ...formData.address, primaryFlag: true }],
                },
              ],
            },
          ],
        },
      ],
    };
    try {
      const response = await fetch(getBaseLink(`api/crm/merchants`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createformData),
      });
      if (response.ok) {
        toast.success(`Customer added successfully`);
        router.push(getBaseLink(`/app/admin/customers`));
      } else {
        const errorData = (await response.json()) as {
          message: string;
        };
        toast.error(errorData.message || `Failed to add Customer`);
      }
    } catch (error) {
      toast.error(`An error occurred while saving the Customer`);
    }
  };

  return (
    <>
      <PageHeader
        LinkElement={Link}
        description={languageData["Customers.New"]}
        href={getBaseLink(`/app/admin/customers`)}
        title={languageData["Customers.New"]}
      />
      <div className="flex h-full w-full flex-row">
        <Card className="m-0 w-full overflow-auto border-0 bg-transparent bg-white pt-5 shadow-none">
          <CardContent>
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
              formClassName="pb-40 "
              formSchema={formSchemaByData()}
              onSubmit={(val) => {
                void handleSave(val as CreateOrganizationDto);
              }}
            >
              <AutoFormSubmit className="float-right">
                {languageData.Save}
              </AutoFormSubmit>
            </AutoForm>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function formSchemaByData() {
  const config = dataCustomers.customers.pages.customers;
  if (config.createFormSchema) {
    config.createFormSchema.schema.properties.telephone.properties.typeCode.enum =
      ["Home", "Office", "Mobile", "Fax"];
    config.createFormSchema.schema.properties.address.properties.typeCode.enum =
      ["Home", "Office"];
    config.createFormSchema.schema.properties.email.properties.typeCode.enum = [
      "Work",
      "Personal",
    ];
  }
  return createZodObject(
    config.createFormSchema?.schema,
    config.createFormSchema?.formPositions,
    undefined,
    config.createFormSchema?.formSubPositions,
  );
}
