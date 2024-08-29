import {
  // $UniRefund_CRMService_Customss_CreateCustomsDto,
  // $UniRefund_CRMService_Merchants_CreateMerchantDto,
  // $UniRefund_CRMService_RefundPoints_CreateRefundPointDto,
  // $UniRefund_CRMService_TaxOffices_CreateTaxOfficeDto,
  // $UniRefund_CRMService_TaxFrees_CreateTaxFreeDto,
  $UniRefund_CRMService_Merchants_MerchantProfileDto,
  $UniRefund_CRMService_Customss_CustomsProfileDto,
  $UniRefund_CRMService_TaxFrees_TaxFreeProfileDto,
  $UniRefund_CRMService_TaxOffices_TaxOfficeProfileDto,
  $UniRefund_CRMService_Merchants_RefundPointProfileDto,
} from "@ayasofyazilim/saas/CRMService";
import type { TableData } from "src/utils";
import {
  $createCustoms,
  $createMerchants,
  $createrefundPoints,
  $createtaxFree,
  $createtaxOffices,
} from "./[domain]/[data]/schemas.gen";

interface DataConfig {
  displayName: string;
  default: string;
  pages: Record<string, TableData>;
}

const formPositions = [
  "name",
  "taxpayerId",
  "legalStatusCode",
  "customerNumber",
  "ituCountryCode",
  "areaCode",
  "telephoneTypeCode",
  "localNumber",
  "primaryFlag",
  "addressLine",
  "territory",
  "postalCode",
  "country",
  "city",
  "fullAddress",
  "addressTypeCode",
  "addressPrimaryFlag",
  "emailAddress",
  "emailTypeCode",
  "emailPrimaryFlag",
];

export const dataConfigOfCrm: Record<string, DataConfig> = {
  companies: {
    displayName: "Companies",
    default: "merchants",
    pages: {
      merchants: {
        title: "Merchants",
        createFormSchema: {
          formPositions,
          schema: $createMerchants,
        },

        tableSchema: {
          excludeList: ["id"],
          schema: $UniRefund_CRMService_Merchants_MerchantProfileDto,
        },
      },
      refundPoints: {
        title: "Refund Points",
        createFormSchema: {
          formPositions,
          schema: $createrefundPoints,
        },

        tableSchema: {
          excludeList: ["id"],
          schema: $UniRefund_CRMService_Merchants_RefundPointProfileDto,
        },
      },
      customs: {
        title: "Customs",
        filterBy: "",
        createFormSchema: {
          formPositions,
          schema: $createCustoms,
        },

        tableSchema: {
          excludeList: ["id"],
          schema: $UniRefund_CRMService_Customss_CustomsProfileDto,
        },
      },
      taxFree: {
        title: "Tax Free",
        filterBy: "",
        createFormSchema: {
          formPositions,
          schema: $createtaxFree,
        },

        tableSchema: {
          excludeList: ["id"],
          schema: $UniRefund_CRMService_TaxFrees_TaxFreeProfileDto,
        },
      },
      taxOffices: {
        title: "Tax Offices",
        filterBy: "",
        createFormSchema: {
          formPositions,
          schema: $createtaxOffices,
        },

        tableSchema: {
          excludeList: ["id"],
          schema: $UniRefund_CRMService_TaxOffices_TaxOfficeProfileDto,
        },
      },
    },
  },
};
