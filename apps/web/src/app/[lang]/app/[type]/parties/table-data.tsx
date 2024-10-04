import type {
  Volo_Abp_Application_Dtos_PagedResultDto_13 as CustomsResponse,
  Volo_Abp_Application_Dtos_PagedResultDto_16 as MerchantResponse,
  Volo_Abp_Application_Dtos_PagedResultDto_17 as RefundPointResponse,
  Volo_Abp_Application_Dtos_PagedResultDto_19 as TaxFreeResponse,
  Volo_Abp_Application_Dtos_PagedResultDto_110 as TaxOfficesResponse,
} from "@ayasofyazilim/saas/CRMService";
import {
  $UniRefund_CRMService_Customss_CustomsProfileDto,
  $UniRefund_CRMService_Merchants_MerchantProfileDto,
  $UniRefund_CRMService_Merchants_RefundPointProfileDto,
  $UniRefund_CRMService_TaxFrees_TaxFreeProfileDto,
  $UniRefund_CRMService_Merchants_CreateMerchantDto as CreateMerchant,
  $UniRefund_CRMService_RefundPoints_CreateRefundPointDto as CreateRefundPoint,
  $UniRefund_CRMService_TaxFrees_CreateTaxFreeDto as CreateTaxFree,
  $UniRefund_CRMService_TaxOffices_CreateTaxOfficeDto as CreateTaxOffice,
  $UniRefund_CRMService_Customss_CreateCustomsDto as CreateCustoms,
  $UniRefund_CRMService_TaxOffices_TaxOfficeProfileDto,
} from "@ayasofyazilim/saas/CRMService";
import { PhoneNumberUtil } from "google-libphonenumber";
import type { TableData } from "@repo/ui/utils/table/table-utils";
import { ContactFormSubPositions } from "@repo/ui/utils/table/form-schemas";

export type PartyNameType =
  | "merchants"
  | "refund-points"
  | "customs"
  | "tax-free"
  | "tax-offices";
export type PartiesResultType =
  | CustomsResponse
  | MerchantResponse
  | RefundPointResponse
  | TaxFreeResponse
  | TaxOfficesResponse;

export type PartiesCreateType =
  | typeof CreateMerchant
  | typeof CreateRefundPoint
  | typeof CreateCustoms
  | typeof CreateTaxFree
  | typeof CreateTaxOffice;

const CommonOrganizationFields = ["name", "taxpayerId", "branchId"];
const OrganizationFields = ["customerNumber", "legalStatusCode"];
const MerchantsFormSubPositions = {
  organization: [...CommonOrganizationFields, ...OrganizationFields],
  ...ContactFormSubPositions,
};
const RefundPointsFormSubPositions = {
  organization: [...CommonOrganizationFields],
  ...ContactFormSubPositions,
};
const CustomsFormSubPositions = {
  organization: [...CommonOrganizationFields],
  ...ContactFormSubPositions,
};
const TaxFreeFormSubPositions = {
  organization: [...CommonOrganizationFields, ...OrganizationFields],
  ...ContactFormSubPositions,
};
const TaxOfficesFormSubPositions = {
  organization: [...CommonOrganizationFields, ...OrganizationFields],
  ...ContactFormSubPositions,
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

function createScheme(schema: PartiesCreateType) {
  return {
    type: "object",
    properties: {
      organization:
        schema.properties.entityInformationTypes.items.properties.organizations
          .items,
      telephone: {
        ...schema.properties.entityInformationTypes.items.properties
          .organizations.items.properties.contactInformations.items.properties
          .telephones.items,
        properties: {
          ...schema.properties.entityInformationTypes.items.properties
            .organizations.items.properties.contactInformations.items.properties
            .telephones.items.properties,
          localNumber,
        },
      },
      address:
        schema.properties.entityInformationTypes.items.properties.organizations
          .items.properties.contactInformations.items.properties.addresses
          .items,
      email:
        schema.properties.entityInformationTypes.items.properties.organizations
          .items.properties.contactInformations.items.properties.emails.items,
    },
  };
}

export const dataConfigOfParties: Record<string, TableData> = {
  merchants: {
    translationKey: "Merchants",
    createFormSchema: {
      schema: createScheme(CreateMerchant),
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
    translationKey: "RefundPoints",
    createFormSchema: {
      schema: createScheme(CreateRefundPoint),
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
    translationKey: "Customs",
    createFormSchema: {
      schema: createScheme(CreateCustoms),
      formPositions: ["organization", "telephone", "address", "email"],
      formSubPositions: CustomsFormSubPositions,
    },
    tableSchema: {
      excludeList: ["id", "organizationId"],
      schema: $UniRefund_CRMService_Customss_CustomsProfileDto,
    },
  },
  "tax-free": {
    translationKey: "TaxFree",
    createFormSchema: {
      schema: createScheme(CreateTaxFree),
      formPositions: ["organization", "telephone", "address", "email"],
      formSubPositions: TaxFreeFormSubPositions,
    },
    tableSchema: {
      excludeList: ["id", "organizationId"],
      schema: $UniRefund_CRMService_TaxFrees_TaxFreeProfileDto,
    },
  },
  "tax-offices": {
    translationKey: "TaxOffices",
    createFormSchema: {
      schema: createScheme(CreateTaxOffice),
      formPositions: ["organization", "telephone", "address", "email"],
      formSubPositions: TaxOfficesFormSubPositions,
    },
    tableSchema: {
      excludeList: ["id", "organizationId"],
      schema: $UniRefund_CRMService_TaxOffices_TaxOfficeProfileDto,
    },
  },
};
