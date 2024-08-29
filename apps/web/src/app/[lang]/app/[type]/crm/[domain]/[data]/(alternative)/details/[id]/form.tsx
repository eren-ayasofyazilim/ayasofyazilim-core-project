"use client";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import {
  SectionLayoutContent,
  SectionLayout,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { useRouter } from "next/navigation";
import type { UniRefund_CRMService_Organizations_UpdateOrganizationDto } from "@ayasofyazilim/saas/CRMService";
import {
  $UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto,
  $UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto,
  $UniRefund_CRMService_Organizations_UpdateOrganizationDto,
  $UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto,
  CRMServiceClient,
} from "@ayasofyazilim/saas/CRMService";
import Link from "next/link";
import { getBaseLink } from "src/utils";
import { updateCRMDetailServer } from "./action";

CRMServiceClient;

// function formSchemaByData(data: string) {
//   let config = dataConfigOfCrm.companies.pages[data];
//   return createZodObject(
//     organization,
//     // config.createFormSchema.formPositions,
//   );
// }
const organization = $UniRefund_CRMService_Organizations_UpdateOrganizationDto;
const email = $UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto;
const telephone = $UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto;
const address = $UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto;

export default function Form({ data, params }: { data: any; params: any }) {
  const router = useRouter();
  const organizationId = data.merchant.entityInformations[0].organizations[0]
    .id as string;
  const organizationSchema = createZodObject(organization);
  const emailSchema = createZodObject(email);
  const telephoneSchema = createZodObject(telephone);
  const addressSchema = createZodObject(address);

  function handleSubmit(values: unknown, sectionName: string) {
    if (sectionName === "organization") {
      updateCRMDetailServer(
        params.id,
        organizationId,
        "merchant",
        values as UniRefund_CRMService_Organizations_UpdateOrganizationDto,
      );
    }
  }

  return (
    <div className="h-full overflow-hidden">
      <PageHeader
        LinkElement={Link}
        description="Details"
        href={getBaseLink(`/app/admin/crm/${params.domain}/${params.data}`)}
        title="Details"
      />

      <SectionLayout
        sections={[
          { name: "Organization", id: "organization" },
          { name: "Email", id: "email" },
          { name: "Telephone", id: "telephone" },
          { name: "Address", id: "address" },
        ]}
        vertical
      >
        <SectionLayoutContent sectionId="organization">
          <AutoForm
            formClassName="pb-40 "
            formSchema={organizationSchema}
            onSubmit={(values) => {
              handleSubmit(values, "organization");
            }}
          >
            <AutoFormSubmit className="float-right">
              Save Changes
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="email">
          <AutoForm formClassName="pb-40 " formSchema={emailSchema}>
            <AutoFormSubmit className="float-right">
              Save Changes
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="telephone">
          <AutoForm formClassName="pb-40 " formSchema={telephoneSchema}>
            <AutoFormSubmit className="float-right">
              Save Changes
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="address">
          <AutoForm formClassName="pb-40 " formSchema={addressSchema}>
            <AutoFormSubmit className="float-right">
              Save Changes
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
      </SectionLayout>
      {/* <SectionLayoutContent sectionId={""}>
        <div className="flex h-full flex-row gap-5">
          <AutoForm formSchema={organizationSchema} formClassName="pb-40 ">
            <AutoFormSubmit className="float-right">
              Save Changes
            </AutoFormSubmit>
          </AutoForm>
          <AutoForm formSchema={emailSchema} formClassName="pb-40 ">
            <AutoFormSubmit className="float-right">
              Save Changes
            </AutoFormSubmit>
          </AutoForm>
        </div>
      </SectionLayoutContent> */}
    </div>
  );
}
