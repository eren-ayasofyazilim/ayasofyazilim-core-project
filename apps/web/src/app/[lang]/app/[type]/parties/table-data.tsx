import type {
  UniRefund_CRMService_Customss_CreateCustomsDto,
  UniRefund_CRMService_Customss_CreateCustomsOrganizationDto,
  UniRefund_CRMService_Merchants_CreateMerchantDto,
  UniRefund_CRMService_RefundPoints_CreateRefundPointDto,
  UniRefund_CRMService_RefundPoints_CreateRefundPointOrganizationDto,
  UniRefund_CRMService_TaxFrees_CreateTaxFreeDto,
  UniRefund_CRMService_TaxFrees_CreateTaxFreeOrganizationDto,
  UniRefund_CRMService_TaxOffices_CreateTaxOfficeDto,
  UniRefund_CRMService_TaxOffices_CreateTaxOfficeOrganizationDto,
  UniRefund_CRMService_Merchants_CreateMerchantOrgnaizationDto,
  Volo_Abp_Application_Dtos_PagedResultDto_110,
  Volo_Abp_Application_Dtos_PagedResultDto_13,
  Volo_Abp_Application_Dtos_PagedResultDto_16,
  Volo_Abp_Application_Dtos_PagedResultDto_17,
  Volo_Abp_Application_Dtos_PagedResultDto_19,
} from "@ayasofyazilim/saas/CRMService";
import {
  $UniRefund_CRMService_Customss_CustomsProfileDto,
  $UniRefund_CRMService_Merchants_MerchantProfileDto,
  $UniRefund_CRMService_Merchants_RefundPointProfileDto,
  $UniRefund_CRMService_TaxFrees_TaxFreeProfileDto,
  $UniRefund_CRMService_TaxOffices_TaxOfficeProfileDto,
  $UniRefund_CRMService_Customss_CreateCustomsDto as CreateCustoms,
  $UniRefund_CRMService_Merchants_CreateMerchantDto as CreateMerchant,
  $UniRefund_CRMService_RefundPoints_CreateRefundPointDto as CreateRefundPoint,
  $UniRefund_CRMService_TaxFrees_CreateTaxFreeDto as CreateTaxFree,
  $UniRefund_CRMService_TaxOffices_CreateTaxOfficeDto as CreateTaxOffice,
} from "@ayasofyazilim/saas/CRMService";
import type {
  addressTypeCodes,
  emailTypeCodes,
  telephoneTypeCodes,
} from "@repo/ui/utils/table/form-schemas";
import { ContactFormSubPositions } from "@repo/ui/utils/table/form-schemas";
import { PhoneNumberUtil } from "google-libphonenumber";

export type CreateMerchantDTO =
  UniRefund_CRMService_Merchants_CreateMerchantDto;
export type CreateCustomsDTO = UniRefund_CRMService_Customss_CreateCustomsDto;
export type CreateRefundPointDTO =
  UniRefund_CRMService_RefundPoints_CreateRefundPointDto;
export type CreateTaxFreeDTO = UniRefund_CRMService_TaxFrees_CreateTaxFreeDto;
export type CreateTaxOfficeDTO =
  UniRefund_CRMService_TaxOffices_CreateTaxOfficeDto;

export type GetMerchantDTO = Volo_Abp_Application_Dtos_PagedResultDto_16;
export type GetRefundPointDTO = Volo_Abp_Application_Dtos_PagedResultDto_17;
export type GetCustomsDTO = Volo_Abp_Application_Dtos_PagedResultDto_13;
export type GetTaxFreeDTO = Volo_Abp_Application_Dtos_PagedResultDto_19;
export type GetTaxOfficeDTO = Volo_Abp_Application_Dtos_PagedResultDto_110;

export type PartyNameType =
  | "merchants"
  | "refund-points"
  | "customs"
  | "tax-free"
  | "tax-offices";

export type PartiesResultType =
  | GetMerchantDTO
  | GetRefundPointDTO
  | GetCustomsDTO
  | GetTaxFreeDTO
  | GetTaxOfficeDTO;

export type PartiesCreateDTOType =
  | CreateMerchantDTO
  | CreateCustomsDTO
  | CreateRefundPointDTO
  | CreateTaxFreeDTO
  | CreateTaxOfficeDTO;

export interface CreatePartiesDto {
  taxOfficeId: string;
  organization:
    | UniRefund_CRMService_Merchants_CreateMerchantOrgnaizationDto
    | UniRefund_CRMService_Customss_CreateCustomsOrganizationDto
    | UniRefund_CRMService_RefundPoints_CreateRefundPointOrganizationDto
    | UniRefund_CRMService_TaxFrees_CreateTaxFreeOrganizationDto
    | UniRefund_CRMService_TaxOffices_CreateTaxOfficeOrganizationDto;
  telephone: {
    areaCode: string;
    localNumber: string;
    ituCountryCode: string;
    primaryFlag: boolean;
    typeCode: telephoneTypeCodes;
  };
  address: {
    addressLine: string;
    city: string;
    terriority: string;
    postalCode: string;
    country: string;
    fullAddress: string;
    primaryFlag: boolean;
    typeCode: addressTypeCodes;
  };
  email: {
    emailAddress: string;
    primaryFlag: boolean;
    typeCode: emailTypeCodes;
  };
}

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
      taxOfficeId: {
        type: "string",
      },
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

export const dataConfigOfParties = {
  merchants: {
    translationKey: "Merchants",
    createFormSchema: {
      schema: createScheme(CreateMerchant),
      formPositions: [
        "organization",
        "telephone",
        "address",
        "email",
        "taxOfficeId",
      ],

      formSubPositions: MerchantsFormSubPositions,
      convertors: {},
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
      convertors: {},
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
      convertors: {},
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
      convertors: {},
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
      convertors: {},
    },
    tableSchema: {
      excludeList: ["id", "organizationId"],
      schema: $UniRefund_CRMService_TaxOffices_TaxOfficeProfileDto,
    },
  },
};
