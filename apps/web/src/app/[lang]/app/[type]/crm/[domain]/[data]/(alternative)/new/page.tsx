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
import { getBaseLink } from "src/utils";
import { dataConfigOfCrm } from "../../../../data";

export interface CreateMerchants {
  name: string;
  taxpayerId: string;
  legalStatusCode: string;
  customerNumber: string;
  ituCountryCode: string;
  areaCode: string;
  telephoneTypeCode: 0 | 1 | 2 | 3;
  localNumber: string;
  primaryFlag: boolean;
  addressLine: string;
  terriority: string;
  postalCode: string;
  country: string;
  city: string;
  fullAddress: string;
  addressTypeCode: 0 | 1;
  addressPrimaryFlag: boolean;
  emailAddress: string;
  emailTypeCode: 0 | 1;
  emailPrimaryFlag: boolean;
}

export default function Page({
  params,
}: {
  params: {
    data: string;
    domain: string;
  };
}) {
  const router = useRouter();
  const handleSave = async (formData: CreateMerchants) => {
    try {
      const response = await fetch(getBaseLink(`api/crm/${params.data}`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success(`${params.data} added successfully`);
        router.push(
          getBaseLink(`/app/admin/crm/${params.domain}/${params.data}`),
        );
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
    <>
      <PageHeader
        LinkElement={Link}
        description={`Add New ${params.data}`}
        href={getBaseLink(`/app/admin/crm/${params.domain}/${params.data}`)}
        title={`Add New ${params.data}`}
      />
      <div className="flex h-full w-full flex-row">
        <Card className="m-0 w-full overflow-auto border-0 bg-transparent bg-white pt-5 shadow-none">
          <CardContent>
            <AutoForm
              formClassName="pb-40 "
              formSchema={formSchemaByData(params.data)}
              onSubmit={(val) => {
                void handleSave(val as CreateMerchants);
              }}
            >
              <AutoFormSubmit className="float-right">
                Save Changes
              </AutoFormSubmit>
            </AutoForm>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function formSchemaByData(data: string) {
  const config = dataConfigOfCrm.companies.pages[data];
  return createZodObject(
    config.createFormSchema?.schema,
    // config.createFormSchema.formPositions,
  );
}
