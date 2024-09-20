import {
  $UniRefund_CRMService_AddressTypes_CreateAddressTypeWithComponentsDto,
  $UniRefund_CRMService_EmailCommonDatas_CreateEmailCommonDataWithComponentsDto,
  $UniRefund_CRMService_NameCommonDatas_CreateNameCommonDataDto,
  $UniRefund_CRMService_PersonalSummaries_CreatePersonalSummaryDto,
  $UniRefund_CRMService_TelephoneTypes_CreateTelephoneTypeWithComponentsDto,
} from "@ayasofyazilim/saas/CRMService";
import { localNumber } from "../../../../../data";

export interface CreateIndividualDto {
  name: {
    salutation: string;
    name: string;
    suffix: string;
    mailingName: string;
    officialName: string;
  };
  personalSummary: {
    date: string;
    birthDate: string;
    ethnicity: string;
    maritalStatusCode: string;
    religiousAffiliationName: string;
    genderTypeCode: 0 | 1;
  };

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

export const createIndividualScheme = {
  type: "object",
  properties: {
    name: $UniRefund_CRMService_NameCommonDatas_CreateNameCommonDataDto,
    personalSummary:
      $UniRefund_CRMService_PersonalSummaries_CreatePersonalSummaryDto,
    telephone: {
      ...$UniRefund_CRMService_TelephoneTypes_CreateTelephoneTypeWithComponentsDto,
      properties: {
        ...$UniRefund_CRMService_TelephoneTypes_CreateTelephoneTypeWithComponentsDto.properties,
        localNumber,
      },
    },
    address:
      $UniRefund_CRMService_AddressTypes_CreateAddressTypeWithComponentsDto,
    email:
      $UniRefund_CRMService_EmailCommonDatas_CreateEmailCommonDataWithComponentsDto,
  },
};

export const formPositions = [
  "name",
  "telephone",
  "personalSummary",
  "address",
  "email",
];

export const formSubPositions = {
  name: ["salutation", "name", "suffix", "mailingName", "officialName"],
  personalSummary: [
    "date",
    "birthDate",
    "ethnicity",
    "maritalStatusCode",
    "religiousAffiliationName",
    "genderTypeCode",
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
