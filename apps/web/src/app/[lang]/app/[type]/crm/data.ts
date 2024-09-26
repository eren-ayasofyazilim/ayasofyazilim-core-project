import {
  $UniRefund_CRMService_AddressTypes_CreateAddressTypeWithComponentsDto,
  $UniRefund_CRMService_Customss_CreateCustomsDto,
  $UniRefund_CRMService_Customss_CustomsProfileDto,
  $UniRefund_CRMService_EmailCommonDatas_CreateEmailCommonDataWithComponentsDto,
  $UniRefund_CRMService_Merchants_CreateMerchantDto,
  $UniRefund_CRMService_Merchants_MerchantProfileDto,
  $UniRefund_CRMService_Merchants_RefundPointProfileDto,
  $UniRefund_CRMService_Organizations_UpdateOrganizationDto,
  $UniRefund_CRMService_RefundPoints_CreateRefundPointDto,
  $UniRefund_CRMService_TaxFrees_CreateTaxFreeDto,
  $UniRefund_CRMService_TaxFrees_TaxFreeProfileDto,
  $UniRefund_CRMService_TaxOffices_CreateTaxOfficeDto,
  $UniRefund_CRMService_TaxOffices_TaxOfficeProfileDto,
  $UniRefund_CRMService_TelephoneTypes_CreateTelephoneTypeWithComponentsDto,
} from "@ayasofyazilim/saas/CRMService";
import { PhoneNumberUtil } from "google-libphonenumber";
import type { TableData } from "src/utils";

interface DataConfig {
  displayName: string;
  default: string;
  pages: Record<string, TableData>;
}

const CommonOrganizationFields = ["name", "taxpayerId", "branchId"];
const OrganizationFields = ["customerNumber", "legalStatusCode"];
const TelephoneSubPosition = ["localNumber", "typeCode"];
const AddressSubPosition = [
  "country",
  "terriority",
  "city",
  "postalCode",
  "addressLine",
  "fullAddress",
  "typeCode",
];
const EmailSubPosition = ["emailAddress", "typeCode"];

const MerchantsFormSubPositions = {
  organization: [...CommonOrganizationFields, ...OrganizationFields],
  telephone: TelephoneSubPosition,
  address: AddressSubPosition,
  email: EmailSubPosition,
};

const RefundPointsFormSubPositions = {
  organization: [...CommonOrganizationFields],
  telephone: TelephoneSubPosition,
  address: AddressSubPosition,
  email: EmailSubPosition,
};

const CustomsFormSubPositions = {
  organization: [...CommonOrganizationFields],
  telephone: TelephoneSubPosition,
  address: AddressSubPosition,
  email: EmailSubPosition,
};

const TaxFreeFormSubPositions = {
  organization: [...CommonOrganizationFields, ...OrganizationFields],
  telephone: TelephoneSubPosition,
  address: AddressSubPosition,
  email: EmailSubPosition,
};

const TaxOfficesFormSubPositions = {
  organization: [...CommonOrganizationFields, ...OrganizationFields],
  telephone: TelephoneSubPosition,
  address: AddressSubPosition,
  email: EmailSubPosition,
};

export const localNumber = {
  type: "string",
  refine: {
    params: {
      message: "Please enter a valid phone number.",
    },
    callback: (value: string) => {
      try {
        const phoneUtil = PhoneNumberUtil.getInstance();
        return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(value));
      } catch (error) {
        return false;
      }
    },
  },
};

export const organization =
  $UniRefund_CRMService_Organizations_UpdateOrganizationDto;
export const telephone =
  $UniRefund_CRMService_TelephoneTypes_CreateTelephoneTypeWithComponentsDto;
export const address =
  $UniRefund_CRMService_AddressTypes_CreateAddressTypeWithComponentsDto;
export const email =
  $UniRefund_CRMService_EmailCommonDatas_CreateEmailCommonDataWithComponentsDto;

const createMerchantsScheme = {
  type: "object",
  properties: {
    organization:
      $UniRefund_CRMService_Merchants_CreateMerchantDto.properties
        .entityInformationTypes.items.properties.organizations.items,
    telephone: {
      ...$UniRefund_CRMService_Merchants_CreateMerchantDto.properties
        .entityInformationTypes.items.properties.organizations.items.properties
        .contactInformations.items.properties.telephones.items,
      properties: {
        ...$UniRefund_CRMService_Merchants_CreateMerchantDto.properties
          .entityInformationTypes.items.properties.organizations.items
          .properties.contactInformations.items.properties.telephones.items
          .properties,
        localNumber,
      },
    },
    address:
      $UniRefund_CRMService_Merchants_CreateMerchantDto.properties
        .entityInformationTypes.items.properties.organizations.items.properties
        .contactInformations.items.properties.addresses.items,
    email:
      $UniRefund_CRMService_Merchants_CreateMerchantDto.properties
        .entityInformationTypes.items.properties.organizations.items.properties
        .contactInformations.items.properties.emails.items,
  },
};

const createrefundPointsScheme = {
  type: "object",
  properties: {
    organization:
      $UniRefund_CRMService_RefundPoints_CreateRefundPointDto.properties
        .entityInformationTypes.items.properties.organizations.items,
    telephone: {
      ...$UniRefund_CRMService_RefundPoints_CreateRefundPointDto.properties
        .entityInformationTypes.items.properties.organizations.items.properties
        .contactInformations.items.properties.telephones.items,
      properties: {
        ...$UniRefund_CRMService_RefundPoints_CreateRefundPointDto.properties
          .entityInformationTypes.items.properties.organizations.items
          .properties.contactInformations.items.properties.telephones.items
          .properties,
        localNumber,
      },
    },
    address:
      $UniRefund_CRMService_RefundPoints_CreateRefundPointDto.properties
        .entityInformationTypes.items.properties.organizations.items.properties
        .contactInformations.items.properties.addresses.items,
    email:
      $UniRefund_CRMService_RefundPoints_CreateRefundPointDto.properties
        .entityInformationTypes.items.properties.organizations.items.properties
        .contactInformations.items.properties.emails.items,
  },
};

const createCustomsScheme = {
  type: "object",
  properties: {
    organization:
      $UniRefund_CRMService_Customss_CreateCustomsDto.properties
        .entityInformationTypes.items.properties.organizations.items,
    telephone: {
      ...$UniRefund_CRMService_Customss_CreateCustomsDto.properties
        .entityInformationTypes.items.properties.organizations.items.properties
        .contactInformations.items.properties.telephones.items,
      properties: {
        ...$UniRefund_CRMService_Customss_CreateCustomsDto.properties
          .entityInformationTypes.items.properties.organizations.items
          .properties.contactInformations.items.properties.telephones.items
          .properties,
        localNumber,
      },
    },
    address:
      $UniRefund_CRMService_Customss_CreateCustomsDto.properties
        .entityInformationTypes.items.properties.organizations.items.properties
        .contactInformations.items.properties.addresses.items,
    email:
      $UniRefund_CRMService_Customss_CreateCustomsDto.properties
        .entityInformationTypes.items.properties.organizations.items.properties
        .contactInformations.items.properties.emails.items,
  },
};

const createTaxFreeScheme = {
  type: "object",
  properties: {
    organization:
      $UniRefund_CRMService_TaxFrees_CreateTaxFreeDto.properties
        .entityInformationTypes.items.properties.organizations.items,
    telephone: {
      ...$UniRefund_CRMService_TaxFrees_CreateTaxFreeDto.properties
        .entityInformationTypes.items.properties.organizations.items.properties
        .contactInformations.items.properties.telephones.items,
      properties: {
        ...$UniRefund_CRMService_TaxFrees_CreateTaxFreeDto.properties
          .entityInformationTypes.items.properties.organizations.items
          .properties.contactInformations.items.properties.telephones.items
          .properties,
        localNumber,
      },
    },
    address:
      $UniRefund_CRMService_TaxFrees_CreateTaxFreeDto.properties
        .entityInformationTypes.items.properties.organizations.items.properties
        .contactInformations.items.properties.addresses.items,
    email:
      $UniRefund_CRMService_TaxFrees_CreateTaxFreeDto.properties
        .entityInformationTypes.items.properties.organizations.items.properties
        .contactInformations.items.properties.emails.items,
  },
};

const createTaxOfficesScheme = {
  type: "object",
  properties: {
    organization:
      $UniRefund_CRMService_TaxOffices_CreateTaxOfficeDto.properties
        .entityInformationTypes.items.properties.organizations.items,
    telephone: {
      ...$UniRefund_CRMService_TaxOffices_CreateTaxOfficeDto.properties
        .entityInformationTypes.items.properties.organizations.items.properties
        .contactInformations.items.properties.telephones.items,
      properties: {
        ...$UniRefund_CRMService_TaxOffices_CreateTaxOfficeDto.properties
          .entityInformationTypes.items.properties.organizations.items
          .properties.contactInformations.items.properties.telephones.items
          .properties,
        localNumber,
      },
    },
    address:
      $UniRefund_CRMService_TaxOffices_CreateTaxOfficeDto.properties
        .entityInformationTypes.items.properties.organizations.items.properties
        .contactInformations.items.properties.addresses.items,
    email:
      $UniRefund_CRMService_TaxOffices_CreateTaxOfficeDto.properties
        .entityInformationTypes.items.properties.organizations.items.properties
        .contactInformations.items.properties.emails.items,
  },
};

export const dataConfigOfCrm: Record<string, DataConfig> = {
  companies: {
    displayName: "Companies",
    default: "merchants",
    pages: {
      merchants: {
        title: "Merchants",
        createFormSchema: {
          schema: createMerchantsScheme,
          formPositions: ["organization", "telephone", "address", "email"],
          formSubPositions: MerchantsFormSubPositions,
        },
        tableSchema: {
          excludeList: [
            "id",
            "organizationId",
            "individualId",
            "parentCompanyId",
            "entityInformationTypeCodeName",
          ],
          schema: $UniRefund_CRMService_Merchants_MerchantProfileDto,
        },
      },
      "refund-points": {
        title: "Refund Points",
        createFormSchema: {
          schema: createrefundPointsScheme,
          formPositions: ["organization", "telephone", "address", "email"],
          formSubPositions: RefundPointsFormSubPositions,
        },

        tableSchema: {
          excludeList: [
            "id",
            "organizationId",
            "individualId",
            "entityInformationTypeCodeValue",
          ],
          schema: $UniRefund_CRMService_Merchants_RefundPointProfileDto,
        },
      },
      customs: {
        title: "Customs",
        filterBy: "",
        createFormSchema: {
          schema: createCustomsScheme,
          formPositions: ["organization", "telephone", "address", "email"],
          formSubPositions: CustomsFormSubPositions,
        },

        tableSchema: {
          excludeList: ["id", "organizationId"],
          schema: $UniRefund_CRMService_Customss_CustomsProfileDto,
        },
      },
      "tax-free": {
        title: "Tax Free",
        filterBy: "",
        createFormSchema: {
          schema: createTaxFreeScheme,
          formPositions: ["organization", "telephone", "address", "email"],
          formSubPositions: TaxFreeFormSubPositions,
        },

        tableSchema: {
          excludeList: ["id", "organizationId"],
          schema: $UniRefund_CRMService_TaxFrees_TaxFreeProfileDto,
        },
      },
      "tax-offices": {
        title: "Tax Offices",
        filterBy: "",
        createFormSchema: {
          schema: createTaxOfficesScheme,
          formPositions: ["organization", "telephone", "address", "email"],
          formSubPositions: TaxOfficesFormSubPositions,
        },

        tableSchema: {
          excludeList: ["id", "organizationId"],
          schema: $UniRefund_CRMService_TaxOffices_TaxOfficeProfileDto,
        },
      },
    },
  },
};
