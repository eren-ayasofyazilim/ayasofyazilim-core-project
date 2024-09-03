"use client";
import { toast } from "@/components/ui/sonner";
import type {
  UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto,
  UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto,
  UniRefund_CRMService_Merchants_MerchantDto,
  UniRefund_CRMService_Organizations_UpdateOrganizationDto,
  UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto,
} from "@ayasofyazilim/saas/CRMService";
import {
  $UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto,
  $UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto,
  $UniRefund_CRMService_Organizations_UpdateOrganizationDto,
  $UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto,
} from "@ayasofyazilim/saas/CRMService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import Link from "next/link";
import { useState } from "react";
import type { TableData } from "src/utils";
import { getBaseLink } from "src/utils";
import { useLocale } from "src/providers/locale";
import { getResourceDataClient } from "src/language-data/CRMService";
import { dataConfigOfCrm } from "../../../../../data";
import { updateCRMDetailServer, updateMerchantCRMDetailServer } from "./action";

const organization = $UniRefund_CRMService_Organizations_UpdateOrganizationDto;
const email = $UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto;
const telephone = $UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto;
const address = $UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto;

export default function Form({
  crmDetailData,
  params,
}: {
  crmDetailData: UniRefund_CRMService_Merchants_MerchantDto;
  params: {
    id: string;
    data: string;
    domain: string;
    lang: string;
  };
}) {
  const [formData] = useState<TableData>(
    dataConfigOfCrm[params.domain].pages[params.data],
  );
  const { resources } = useLocale();
  const languageData = getResourceDataClient(resources, params.lang);
  const organizationInfo =
    crmDetailData.entityInformations?.[0]?.organizations?.[0];
  const organizationId = organizationInfo?.id || "";

  const emailInfo = organizationInfo?.contactInformations?.[0]?.emails?.[0];
  const telephoneInfo =
    organizationInfo?.contactInformations?.[0]?.telephones?.[0];
  const addressInfo =
    organizationInfo?.contactInformations?.[0]?.addresses?.[0];

  const organizationSchema = createZodObject(organization, ["name"]);
  const emailSchema = createZodObject(email, [
    "primaryFlag",
    "typeCode",
    "emailAddress",
  ]);
  const telephoneSchema = createZodObject(telephone, [
    "primaryFlag",
    "typeCode",
    "ituCountryCode",
    "areaCode",
    "localNumber",
  ]);
  const addressSchema = createZodObject(address, [
    "primaryFlag",
    "typeCode",
    "country",
    "terriority",
    "city",
    "postalCode",
    "addressLine",
    "fullAddress",
  ]);

  async function handleSubmit(values: unknown, sectionName: string) {
    if (typeof values !== "object") return;

    let response = "fail";
    if (sectionName === "organization") {
      await updateMerchantCRMDetailServer(
        params.id,
        organizationId,
        "merchant",
        values as UniRefund_CRMService_Organizations_UpdateOrganizationDto,
      );
      response = "success";
    }
    if (sectionName === "email") {
      await updateCRMDetailServer(
        emailInfo?.id || "",
        values as UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto,
      );
      response = "success";
    }
    if (sectionName === "telephone") {
      await updateCRMDetailServer(
        telephoneInfo?.id || "",
        values as UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto,
      );
      response = "success";
    }
    if (sectionName === "address") {
      await updateCRMDetailServer(
        addressInfo?.id || "",
        values as UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto,
      );
      response = "success";
    }
    if (response) {
      toast.success("Updated successfully!");
    }
  }

  return (
    <div className="h-full overflow-hidden">
      <PageHeader
        LinkElement={Link}
        description={
          languageData[
            `${formData.title?.replaceAll(" ", "")}.Edit` as keyof typeof languageData
          ]
        }
        href={getBaseLink(`/app/admin/crm/${params.domain}/${params.data}`)}
        title={
          languageData[
            `${formData.title?.replaceAll(" ", "")}.Edit` as keyof typeof languageData
          ]
        }
      />
      <SectionLayout
        sections={[
          { name: languageData.Organization, id: "organization" },
          { name: languageData.Telephone, id: "telephone" },
          { name: languageData.Address, id: "address" },
          { name: languageData.Email, id: "email" },
        ]}
        vertical
      >
        <SectionLayoutContent sectionId="organization">
          <AutoForm
            formClassName="pb-40 "
            formSchema={organizationSchema}
            onSubmit={(values) => {
              void handleSubmit(values, "organization");
            }}
            values={{
              name: organizationInfo?.name,
            }}
          >
            <AutoFormSubmit className="float-right">
              {languageData.Save}
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="telephone">
          <AutoForm
            formClassName="pb-40 "
            formSchema={telephoneSchema}
            onSubmit={(values) => {
              void handleSubmit(values, "telephone");
            }}
            values={{
              areaCode: telephoneInfo?.areaCode,
              localNumber: telephoneInfo?.localNumber,
              ituCountryCode: telephoneInfo?.ituCountryCode,
              primaryFlag: telephoneInfo?.primaryFlag,
              typeCode: telephoneInfo?.typeCode?.toString(),
            }}
          >
            <AutoFormSubmit className="float-right">
              {languageData.Save}
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="address">
          <AutoForm
            formClassName="pb-40 "
            formSchema={addressSchema}
            onSubmit={(values) => {
              void handleSubmit(values, "address");
            }}
            values={{
              addressLine: addressInfo?.addressLine,
              city: addressInfo?.city,
              country: addressInfo?.country,
              fullAddress: addressInfo?.fullAddress,
              postalCode: addressInfo?.postalCode,
              terriority: addressInfo?.terriority,
              typeCode: addressInfo?.typeCode?.toString(),
              primaryFlag: addressInfo?.primaryFlag,
            }}
          >
            <AutoFormSubmit className="float-right">
              {languageData.Save}
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="email">
          <AutoForm
            formClassName="pb-40 "
            formSchema={emailSchema}
            onSubmit={(values) => {
              void handleSubmit(values, "email");
            }}
            values={{
              emailAddress: emailInfo?.emailAddress,
              typeCode: emailInfo?.typeCode?.toString(),
              primaryFlag: emailInfo?.primaryFlag,
            }}
          >
            <AutoFormSubmit className="float-right">
              {languageData.Save}
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
      </SectionLayout>
    </div>
  );
}
