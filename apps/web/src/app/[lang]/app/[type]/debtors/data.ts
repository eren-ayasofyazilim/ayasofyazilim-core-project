import {
  $UniRefund_CRMService_AddressTypes_CreateAddressTypeWithComponentsDto,
  $UniRefund_CRMService_EmailCommonDatas_CreateEmailCommonDataWithComponentsDto,
  $UniRefund_CRMService_Merchants_CreateMerchantDto,
  $UniRefund_CRMService_Merchants_MerchantProfileDto,
  $UniRefund_CRMService_Organizations_UpdateOrganizationDto,
  $UniRefund_CRMService_TelephoneTypes_CreateTelephoneTypeWithComponentsDto,
} from "@ayasofyazilim/saas/CRMService";
import { PhoneNumberUtil } from "google-libphonenumber";
import type { TableData } from "@repo/ui/utils/table/table-utils";

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

export const dataDebtors: Record<string, DataConfig> = {
  debtors: {
    displayName: "Debtors",
    default: "debtors",
    pages: {
      debtors: {
        title: "debtors",
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
    },
  },
};
