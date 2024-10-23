"use client";

import type {
  UniRefund_CRMService_Individuals_IndividualDto,
  UniRefund_CRMService_Organizations_OrganizationDto,
  UniRefund_LocationService_AddressCommonDatas_AddressCommonDataUpdateDto,
} from "@ayasofyazilim/saas/CRMService";
import type { UniRefund_LocationService_Cities_CityDto } from "@ayasofyazilim/saas/LocationService";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { SectionLayoutContent } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { useRouter } from "next/navigation";
import { putCrmAddressApi } from "src/app/[lang]/app/actions/CrmService/put-actions";
import {
  getAddressFieldConfig,
  getAddressSchema,
} from "src/app/[lang]/app/actions/LocationService/schemas";
import { handlePutResponse } from "src/app/[lang]/app/actions/api-utils";
import type { CRMServiceServiceResource } from "src/language-data/CRMService";
import type { PartyNameType } from "../../../types";

function Address({
  languageData,
  partyName,
  partyId,
  organizationData,
  cityList,
}: {
  languageData: CRMServiceServiceResource;
  partyName: Exclude<PartyNameType, "individuals">;
  partyId: string;
  organizationData:
    | UniRefund_CRMService_Organizations_OrganizationDto
    | UniRefund_CRMService_Individuals_IndividualDto
    | undefined;
  cityList: UniRefund_LocationService_Cities_CityDto[];
}) {
  const router = useRouter();
  const addressValues =
    organizationData?.contactInformations?.[0]?.addresses?.[0];

  const addressSchema = getAddressSchema([
    "countryId",
    "regionId",
    "districtId",
  ]);
  const addressSchemaFieldConfig = getAddressFieldConfig({
    cityList,
    languageData,
  });

  function handleSubmit(
    formData: UniRefund_LocationService_AddressCommonDatas_AddressCommonDataUpdateDto,
  ) {
    void putCrmAddressApi(partyName, {
      requestBody: formData,
      id: partyId,
      addressId: addressValues?.id || "",
    }).then((response) => {
      handlePutResponse(response, router);
    });
  }

  return (
    <SectionLayoutContent sectionId="address">
      <AutoForm
        fieldConfig={addressSchemaFieldConfig}
        formClassName="pb-40"
        formSchema={addressSchema}
        onSubmit={(values) => {
          const formData: UniRefund_LocationService_AddressCommonDatas_AddressCommonDataUpdateDto =
            {
              ...values,
              countryId: "08d60112-a93a-b0cb-fbac-3a153b383eaf",
            } as UniRefund_LocationService_AddressCommonDatas_AddressCommonDataUpdateDto;
          handleSubmit(formData);
        }}
        values={addressValues}
      >
        <AutoFormSubmit className="float-right">
          {languageData.Save}
        </AutoFormSubmit>
      </AutoForm>
    </SectionLayoutContent>
  );
}

export default Address;
