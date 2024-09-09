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
import type { TableData } from "src/utils";
import { getBaseLink } from "src/utils";
import { isPhoneValid, splitPhone } from "src/utils-phone";
import { getResourceDataClient } from "src/language-data/CRMService";
import { useLocale } from "src/providers/locale";
import { dataConfigOfCrm } from "../../../../../../data";
import type { CreateOrganizationDto } from "../../../new/page";

const formSubPositions = {
  organization: [
    "name",
    "taxpayerId",
    "legalStatusCode",
    "customerNumber",
    "branchId",
  ],
  telephone: ["localNumber", "typeCode"],
  address: [
    "country",
    "terriority",
    "city",
    "postalCode",
    "addressLine",
    "fullAddress",
    "typeCode",
  ],
  email: ["emailAddress", "typeCode"],
};
export default function Page({
  params,
}: {
  params: {
    data: string;
    domain: string;
    lang: string;
    id: string;
  };
}) {
  const router = useRouter();
  const [_formData] = useState<TableData>(
    dataConfigOfCrm[params.domain].pages[params.data],
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
              parentCompanyId: params.id,
              contactInformations: [
                {
                  telephones: [formData.telephone],
                  emails: [formData.email],
                  addresses: [formData.address],
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
        toast.success(`Sub Company added successfully`);
        router.push(
          getBaseLink(
            `/app/admin/crm/${params.domain}/${params.data}/${params.id}`,
          ),
        );
      } else {
        const errorData = (await response.json()) as {
          message: string;
        };
        toast.error(errorData.message || `Failed to add Sub Company`);
      }
    } catch (error) {
      toast.error(`An error occurred while saving the Sub Company`);
    }
  };

  return (
    <>
      <PageHeader
        LinkElement={Link}
        description="Add new Sub Company"
        href={getBaseLink(
          `/app/admin/crm/${params.domain}/${params.data}/${params.id}`,
        )}
        title="Add new Sub Company"
      />
      <div className="flex h-full w-full flex-row">
        <Card className="m-0 w-full overflow-auto border-0 bg-transparent bg-white pt-5 shadow-none">
          <CardContent>
            <AutoForm
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
  const config = dataConfigOfCrm.companies.pages.merchants;
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
    formSubPositions,
  );
}
