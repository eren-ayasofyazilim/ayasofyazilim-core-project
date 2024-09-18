"use client";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import {
  $UniRefund_CRMService_Individuals_IndividualProfileDto,
  type Volo_Abp_Application_Dtos_PagedResultDto_15 as PagedResultType,
  type UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto,
  type UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto,
  type UniRefund_CRMService_Merchants_MerchantDto,
  type UniRefund_CRMService_Organizations_UpdateOrganizationDto,
  type UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto,
} from "@ayasofyazilim/saas/CRMService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import jsonToCSV from "@repo/ayasofyazilim-ui/lib/json-to-csv";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import type { TableAction } from "@repo/ayasofyazilim-ui/molecules/tables";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getResourceDataClient } from "src/language-data/CRMService";
import { useLocale } from "src/providers/locale";
import type { TableData } from "src/utils";
import { getBaseLink } from "src/utils";
import { isPhoneValid, splitPhone } from "src/utils-phone";
import {
  deleteSubMerchantByMerchantId,
  getAllIndividuals,
  getSubCompanyByMerchantId,
} from "../../../actions/merchant";
import { dataConfigOfCrm } from "../../../data";
import { updateCRMDetailServer, updateMerchantCRMDetailServer } from "./action";
import { address, email, organization, telephone } from "./data";

export default function Form({
  crmDetailData,
  params,
}: {
  crmDetailData: UniRefund_CRMService_Merchants_MerchantDto;
  params: {
    id: string;
    data: string;
    lang: string;
  };
}) {
  const [formData] = useState<TableData>(
    dataConfigOfCrm.companies.pages[params.data],
  );
  const router = useRouter();
  const [SubCompaniesData, setSubCompaniesData] = useState<PagedResultType>();
  const [IndividualsData, setIndividualsData] = useState<PagedResultType>();
  const [loading, setLoading] = useState(true);
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
  const emailSchema = createZodObject(email, ["emailAddress", "typeCode"]);
  const telephoneSchema = createZodObject(telephone, [
    "localNumber",
    "typeCode",
  ]);
  const phoneNumber =
    (telephoneInfo?.ituCountryCode || "+90") +
    (telephoneInfo?.areaCode || "") +
    (telephoneInfo?.localNumber || "");
  const addressSchema = createZodObject(address, [
    "country",
    "terriority",
    "city",
    "postalCode",
    "addressLine",
    "fullAddress",
    "typeCode",
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
      await updateCRMDetailServer(emailInfo?.id || "", {
        ...values,
        primaryFlag: true,
      } as UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto);
      response = "success";
    }
    if (sectionName === "telephone") {
      const parsedValues = {
        ...values,
        primaryFlag: true,
      } as UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto;
      const isValid = isPhoneValid(parsedValues.localNumber);
      if (!isValid) {
        return;
      }
      const phoneData = splitPhone(parsedValues.localNumber);
      await updateCRMDetailServer(telephoneInfo?.id || "", {
        ...values,
        primaryFlag: true,
        ...phoneData,
      } as UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto);
      response = "success";
    }
    if (sectionName === "address") {
      await updateCRMDetailServer(addressInfo?.id || "", {
        ...values,
        primaryFlag: true,
      } as UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto);
      response = "success";
    }
    if (response) {
      toast.success("Updated successfully!");
    }
  }

  async function getSubCompaniesOfMerchant() {
    setLoading(true);
    try {
      const response = await getSubCompanyByMerchantId({
        id: params.id,
      });
      if (response.type === "error" || response.type === "api-error") {
        toast.error(response.status);
        return;
      }
      const SubCompaniesdata = response.data;
      setSubCompaniesData(SubCompaniesdata);
    } catch (error) {
      toast.error("An error occurred while fetching Sub Companies.");
    } finally {
      setLoading(false);
    }
  }

  async function getIndividuals(page: number) {
    setLoading(true);
    try {
      const response = await getAllIndividuals({
        maxResultCount: 10,
        skipCount: page * 10,
      });
      if (response.type === "error" || response.type === "api-error") {
        toast.error(response.status);
        return;
      }
      const Individualsdata = response.data;
      setIndividualsData(Individualsdata);
    } catch (error) {
      toast.error("An error occurred while fetching Individual.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteSubMerchant(id: string) {
    setLoading(true);
    try {
      const response = await deleteSubMerchantByMerchantId({ id });
      if (response.type === "error" || response.type === "api-error") {
        toast.error(response.status);
        return;
      }
      toast.success("Sub Company deleted successfully.");
    } catch (error) {
      toast.error("An error occurred while deleting Sub Company.");
    } finally {
      setLoading(false);
    }
  }

  const actionSubCompany: TableAction[] = [
    {
      cta: languageData[
        `${"SubCompany".replaceAll(" ", "")}.New` as keyof typeof languageData
      ],
      type: "NewPage",
      href: `/app/admin/crm/${params.data}/${params.id}/subcompany/new/`,
    },
    {
      cta: `Export CSV`,
      callback: () => {
        jsonToCSV(SubCompaniesData, params.data);
      },
      type: "Action",
    },
  ];

  const actionIndividuals: TableAction[] = [
    {
      cta: languageData[
        `${"Individuals".replaceAll(" ", "")}.New` as keyof typeof languageData
      ],
      type: "NewPage",
      href: `/app/admin/crm/${params.data}/${params.id}/individual/new/`,
    },
    {
      cta: `Export CSV`,
      callback: () => {
        jsonToCSV(IndividualsData, params.data);
      },
      type: "Action",
    },
  ];

  return (
    <div className="h-full overflow-hidden">
      <PageHeader
        LinkElement={Link}
        description={
          languageData[
            `${formData.title?.replaceAll(" ", "")}.Edit` as keyof typeof languageData
          ]
        }
        href={getBaseLink(`/app/admin/crm/${params.data}`)}
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
          { name: languageData["Sub.Company"], id: "SubCompany" },
          { name: languageData.Individuals, id: "individuals" },
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
            fieldConfig={{
              localNumber: {
                fieldType: "phone",
                displayName: "Telephone Number",
                inputProps: {
                  showLabel: true,
                },
              },
            }}
            formClassName="pb-40 "
            formSchema={telephoneSchema}
            onSubmit={(values) => {
              void handleSubmit(values, "telephone");
            }}
            values={{
              localNumber: phoneNumber,
              primaryFlag: telephoneInfo?.primaryFlag,
              typeCode:
                telephone.properties.typeCode.enum[
                  telephoneInfo?.typeCode || 0
                ],
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
              typeCode:
                address.properties.typeCode.enum[addressInfo?.typeCode || 0],
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
            fieldConfig={{
              emailAddress: {
                inputProps: {
                  type: "email",
                },
              },
            }}
            formClassName="pb-40 "
            formSchema={emailSchema}
            onSubmit={(values) => {
              void handleSubmit(values, "email");
            }}
            values={{
              emailAddress: emailInfo?.emailAddress,
              typeCode:
                email.properties.typeCode.enum[emailInfo?.typeCode || 0],
              primaryFlag: emailInfo?.primaryFlag,
            }}
          >
            <AutoFormSubmit className="float-right">
              {languageData.Save}
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="SubCompany">
          <Card className="px-4">
            <DataTable
              action={actionSubCompany}
              columnsData={{
                type: "Auto",
                data: {
                  tableType:
                    dataConfigOfCrm.companies.pages.merchants.tableSchema
                      .schema,
                  excludeList: [
                    "organizationId",
                    "individualId",
                    "parentCompanyId",
                    "id",
                  ],
                  actionList: [
                    {
                      cta: languageData.Delete,
                      type: "Action",
                      callback: (row: { id: string }) => {
                        void deleteSubMerchant(row.id);
                      },
                    },
                    {
                      cta: languageData.Edit,
                      type: "Action",
                      callback: (row: { id: string }) => {
                        router.push(
                          getBaseLink(`app/admin/crm/${params.data}/${row.id}`),
                        );
                      },
                    },
                  ],
                },
              }}
              data={SubCompaniesData?.items || []}
              fetchRequest={getSubCompaniesOfMerchant}
              isLoading={loading}
              rowCount={SubCompaniesData?.totalCount}
            />
          </Card>
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="individuals">
          <Card className="px-4">
            <DataTable
              action={actionIndividuals}
              columnsData={{
                type: "Auto",
                data: {
                  tableType:
                    $UniRefund_CRMService_Individuals_IndividualProfileDto,
                  excludeList: [
                    "id",
                    "affiliationId",
                    "affiliationTypeCodeValue",
                    "affiliationParentTypeCodeValue",
                  ],
                  actionList: [
                    {
                      cta: languageData.Edit,
                      type: "Action",
                      callback: () => {
                        ("");
                      },
                    },
                  ],
                },
              }}
              data={IndividualsData?.items || []}
              fetchRequest={getIndividuals}
              isLoading={loading}
              rowCount={IndividualsData?.totalCount}
            />
          </Card>
        </SectionLayoutContent>
      </SectionLayout>
    </div>
  );
}
