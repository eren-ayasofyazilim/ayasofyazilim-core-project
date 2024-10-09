"use client";

import { toast } from "@/components/ui/sonner";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import {
  addressSchemaByData,
  emailSchema,
  telephoneSchema,
} from "@repo/ui/utils/table/form-schemas";
import { getEnumId, getEnumName } from "@repo/ui/utils/table/table-utils";
import { useRouter } from "next/navigation";
import { getResourceDataClient } from "src/language-data/CRMService";
import { useLocale } from "src/providers/locale";
import { isPhoneValid, splitPhone } from "src/utils-phone";
import { dataConfigOfParties } from "../../table-data";
import type { PartyNameType } from "../../types";
import { putParty } from "./action";
import type {
  GetPartiesDetailResult,
  PutAddress,
  PutEmail,
  PutOrganization,
  PutTelephone,
} from "./types";
import { editSchemasOfParties } from "./update-data";

export default function Form({
  partyDetailData,
  params,
  citiesEnum,
}: {
  partyDetailData: GetPartiesDetailResult;
  citiesEnum: { name: string; id: string }[];
  params: {
    partyId: string;
    partyName: PartyNameType;
    lang: string;
  };
}) {
  const router = useRouter();
  const { resources } = useLocale();
  const languageData = getResourceDataClient(resources, params.lang);

  const partyData = dataConfigOfParties[params.partyName];
  const { organizationSchema, organizationSchemaSubPositions } =
    editSchemasOfParties[params.partyName];

  //hide branchId & parent because its headquarter
  const _organizationSchema = createZodObject(
    organizationSchema,
    organizationSchemaSubPositions,
  );

  const organizationData =
    partyDetailData.entityInformations?.[0]?.organizations?.[0];
  const emailValues = organizationData?.contactInformations?.[0]?.emails?.[0];
  const addressValues = {
    ...organizationData?.contactInformations?.[0]?.addresses?.[0],
    city: getEnumName(
      citiesEnum,
      organizationData?.contactInformations?.[0]?.addresses?.[0]?.city || "",
    ),
  };

  const telephoneData =
    organizationData?.contactInformations?.[0]?.telephones?.[0];
  const telephoneValues = {
    localNumber:
      (telephoneData?.ituCountryCode || "+90") +
      (telephoneData?.areaCode || "") +
      (telephoneData?.localNumber || ""),
    primaryFlag: telephoneData?.primaryFlag,
    typeCode: telephoneData?.typeCode,
  };

  const addressSchema = addressSchemaByData([], citiesEnum, [
    "country",
    "terriority",
  ]).schema;

  async function handleSubmit(
    putData: PutOrganization | PutTelephone | PutAddress | PutEmail,
  ) {
    const response = await putParty(params.partyName, putData);
    if (response.type === "success") {
      toast.success("Updated successfully");
      router.refresh();
    } else {
      toast.error(response.message);
    }
  }
  return (
    <div className="h-full overflow-hidden">
      <SectionLayout
        sections={[
          { name: languageData.Organization, id: "organization" },
          { name: languageData.Telephone, id: "telephone" },
          { name: languageData.Address, id: "address" },
          { name: languageData.Email, id: "email" },
          { name: languageData[partyData.subEntityName], id: "SubCompany" },
          { name: languageData.Individuals, id: "individuals" },
        ]}
        vertical
      >
        <SectionLayoutContent sectionId="organization">
          <AutoForm
            formClassName="pb-40"
            formSchema={_organizationSchema}
            onSubmit={(values) => {
              void handleSubmit({
                action: "organization",
                data: {
                  requestBody: values as PutOrganization["data"]["requestBody"],
                  id: params.partyId,
                  organizationId: organizationData?.id || "",
                },
              });
            }}
            values={organizationData}
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
              const isValid = isPhoneValid(values.localNumber as string);
              if (!isValid) {
                return;
              }
              const phoneData = splitPhone(values.localNumber as string);
              void handleSubmit({
                action: "telephone",
                data: {
                  requestBody: {
                    ...values,
                    ...phoneData,
                  } as PutTelephone["data"]["requestBody"],
                  id: params.partyId,
                  telephoneId: telephoneData?.id || "",
                },
              });
            }}
            values={telephoneValues}
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
              void handleSubmit({
                action: "address",
                data: {
                  requestBody: {
                    ...values,
                    city: getEnumId(citiesEnum, values.city as string),
                    country:
                      organizationData?.contactInformations?.[0]?.addresses?.[0]
                        ?.country || "",
                    terriority:
                      organizationData?.contactInformations?.[0]?.addresses?.[0]
                        ?.terriority || "",
                  } as PutAddress["data"]["requestBody"],
                  id: params.partyId,
                  addressId: addressValues.id || "",
                },
              });
            }}
            values={addressValues}
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
              void handleSubmit({
                action: "email",
                data: {
                  requestBody: values as PutEmail["data"]["requestBody"],
                  id: params.partyId,
                  emailId: emailValues?.id || "",
                },
              });
            }}
            values={emailValues}
          >
            <AutoFormSubmit className="float-right">
              {languageData.Save}
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
        {/* <SectionLayoutContent sectionId="SubCompany">
          <Card className="px-4">
            <DataTable
              action={actionSubCompany}
              columnsData={{
                type: "Auto",
                data: {
                  tableType: dataConfigOfParties.merchants.tableSchema.schema,
                  excludeList: [
                    "entityInformationTypeCodeName",
                    "organizationId",
                    "individualId",
                    "parentCompanyId",
                    "id",
                  ],
                  actionList: [
                    {
                      cta: languageData.Delete,
                      type: "Dialog",
                      componentType: "ConfirmationDialog",
                      // title: `${languageData.Delete} ${params.data}`,
                      description: languageData["Delete.Assurance"],
                      cancelCTA: languageData.Cancel,
                      variant: "destructive",
                      callback: (row: { id: string }) => {
                        void deleteSubMerchant(row.id);
                      },
                    },
                    {
                      cta: languageData.Edit,
                      type: "Action",
                      callback: (row: { id: string }) => {
                        router.push(
                          getBaseLink(
                            `app/admin/crm/${params.partyName}/${row.id}`,
                          ),
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
        </SectionLayoutContent> */}
      </SectionLayout>
    </div>
  );
}
