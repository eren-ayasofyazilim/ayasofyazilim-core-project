import {
  $UniRefund_CRMService_Merchants_MerchantProfileDto,
  $UniRefund_CRMService_RefundPoints_RefundPointDto,
  // $UniRefund_CRMService_Customss_CreateCustomsDto,
  // $UniRefund_CRMService_Merchants_CreateMerchantDto,
  // $UniRefund_CRMService_RefundPoints_CreateRefundPointDto,
  // $UniRefund_CRMService_TaxOffices_CreateTaxOfficeDto,
  // $UniRefund_CRMService_TaxFrees_CreateTaxFreeDto,
  $UniRefund_CRMService_Customss_CustomsProfileDto,
  $UniRefund_CRMService_TaxFrees_TaxFreeProfileDto,
  $UniRefund_CRMService_TaxOffices_TaxOfficeProfileDto,
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

export const dataConfigOfCrm: Record<string, DataConfig> = {
  companies: {
    displayName: "Companies",
    default: "merchants",
    pages: {
      merchants: {
        title: "Merchants",
        createFormSchema: {
          formPositions: [
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
          ],
          schema: $createMerchants,
        },
        // editFormSchema: {
        //   formPositions: ["percent", "minimumTotalAmount", "countryId", "active"],
        //   schema: $UniRefund_SettingService_Vats_UpdateVatDto,
        //   convertors: {
        //     countryId: {
        //       data: () => {
        //         return fetch(getBaseLink("api/management/country")).then((data) =>
        //           data.json(),
        //         );
        //       },
        //       get: "name",
        //       post: "id",
        //       type: "async",
        //     },
        //   },
        // },
        tableSchema: {
          excludeList: ["id"],
          schema: $UniRefund_CRMService_Merchants_MerchantProfileDto,
        },
      },
      refundPoints: {
        title: "Refund Points",
        createFormSchema: {
          formPositions: [
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
          ],
          schema: $createrefundPoints,
        },
        // editFormSchema: {
        //   formPositions: [
        //     "name",
        //     "articleCode",
        //     "unitCode",
        //     "companyType",
        //     "nonFood",
        //     "active",
        //     "food",
        //   ],
        //   schema: $UniRefund_SettingService_ProductGroups_UpdateProductGroupDto,
        // },
        tableSchema: {
          excludeList: ["id"],
          schema: $UniRefund_CRMService_RefundPoints_RefundPointDto,
        },
      },
      customs: {
        title: "Customs",
        filterBy: "",
        createFormSchema: {
          formPositions: [
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
          ],
          schema: $createCustoms,
        },
        // editFormSchema: {
        //   formPositions: ["productGroupId", "countryId", "vatId", "active"],
        //   schema:
        //     $UniRefund_SettingService_ProductGroupVats_UpdateProductGroupVatDto,
        // },
        tableSchema: {
          excludeList: ["id"],
          schema: $UniRefund_CRMService_Customss_CustomsProfileDto,
        },
      },
      taxFree: {
        title: "Tax Free",
        filterBy: "",
        createFormSchema: {
          formPositions: [
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
          ],
          schema: $createtaxFree,
        },
        // editFormSchema: {
        //   formPositions: ["productGroupId", "countryId", "vatId", "active"],
        //   schema:
        //     $UniRefund_SettingService_ProductGroupVats_UpdateProductGroupVatDto,
        // },
        tableSchema: {
          excludeList: ["id"],
          schema: $UniRefund_CRMService_TaxFrees_TaxFreeProfileDto,
        },
      },
      taxOffices: {
        title: "Tax Offices",
        filterBy: "",
        createFormSchema: {
          formPositions: [
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
          ],
          schema: $createtaxOffices,
        },
        // editFormSchema: {
        //   formPositions: ["productGroupId", "countryId", "vatId", "active"],
        //   schema:
        //     $UniRefund_SettingService_ProductGroupVats_UpdateProductGroupVatDto,
        // },
        tableSchema: {
          excludeList: ["id"],
          schema: $UniRefund_CRMService_TaxOffices_TaxOfficeProfileDto,
        },
      },
    },
  },
};
