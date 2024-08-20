/* eslint-disable @typescript-eslint/no-explicit-any -- TODO: we need to fix this*/
import {
  $UniRefund_SettingService_ProductGroups_CreateProductGroupDto,
  $UniRefund_SettingService_ProductGroups_ProductGroupDto,
  $UniRefund_SettingService_ProductGroups_UpdateProductGroupDto,
  $UniRefund_SettingService_ProductGroupVats_CreateProductGroupVatDto,
  $UniRefund_SettingService_ProductGroupVats_ProductGroupVatDto,
  $UniRefund_SettingService_ProductGroupVats_UpdateProductGroupVatDto,
  $UniRefund_SettingService_Vats_CreateVatDto,
  $UniRefund_SettingService_Vats_UpdateVatDto,
  $UniRefund_SettingService_Vats_VatDto,
} from "@ayasofyazilim/saas/SettingService";
import { getBaseLink } from "src/utils";

export const dataConfigOfCrm: Record<string, any> = {
  companies: {
    displayName: "Companies",
    default: "merchants",
    merchants: {
      title: "Merchants",
      createFormSchema: {
        formPositions: ["percent", "minimumTotalAmount", "countryId", "active"],
        schema: $UniRefund_SettingService_Vats_CreateVatDto,
        convertors: {
          countryId: {
            data: () => {
              return fetch(getBaseLink("api/management/country")).then((data) =>
                data.json(),
              );
            },
            get: "name",
            post: "id",
            type: "async",
          },
        },
      },
      editFormSchema: {
        formPositions: ["percent", "minimumTotalAmount", "countryId", "active"],
        schema: $UniRefund_SettingService_Vats_UpdateVatDto,
        convertors: {
          countryId: {
            data: () => {
              return fetch(getBaseLink("api/management/country")).then((data) =>
                data.json(),
              );
            },
            get: "name",
            post: "id",
            type: "async",
          },
        },
      },
      tableSchema: {
        excludeList: [
          "id",
          "creationTime",
          "creatorId",
          "lastModificationTime",
          "lastModifierId",
          "isDeleted",
          "deleterId",
          "deletionTime",
        ],
        schema: $UniRefund_SettingService_Vats_VatDto,
      },
    },
    refundPoints: {
      title: "Refund Points",
      createFormSchema: {
        formPositions: [
          "name",
          "articleCode",
          "unitCode",
          "companyType",
          "nonFood",
          "active",
          "food",
        ],
        schema: $UniRefund_SettingService_ProductGroups_CreateProductGroupDto,
      },
      editFormSchema: {
        formPositions: [
          "name",
          "articleCode",
          "unitCode",
          "companyType",
          "nonFood",
          "active",
          "food",
        ],
        schema: $UniRefund_SettingService_ProductGroups_UpdateProductGroupDto,
      },
      tableSchema: {
        excludeList: [
          "id",
          "creationTime",
          "creatorId",
          "lastModificationTime",
          "lastModifierId",
          "isDeleted",
          "deleterId",
          "deletionTime",
          "language",
        ],
        schema: $UniRefund_SettingService_ProductGroups_ProductGroupDto,
      },
    },
    customs: {
      title: "Customs",
      filterBy: "",
      createFormSchema: {
        formPositions: ["productGroupId", "countryId", "vatId", "active"],
        schema:
          $UniRefund_SettingService_ProductGroupVats_CreateProductGroupVatDto,
      },
      editFormSchema: {
        formPositions: ["productGroupId", "countryId", "vatId", "active"],
        schema:
          $UniRefund_SettingService_ProductGroupVats_UpdateProductGroupVatDto,
      },
      tableSchema: {
        excludeList: [
          "id",
          "creationTime",
          "creatorId",
          "lastModificationTime",
          "lastModifierId",
          "isDeleted",
          "deleterId",
          "deletionTime",
        ],
        schema: $UniRefund_SettingService_ProductGroupVats_ProductGroupVatDto,
      },
    },
    taxFree: {
      title: "Tax Free",
      filterBy: "",
      createFormSchema: {
        formPositions: ["productGroupId", "countryId", "vatId", "active"],
        schema:
          $UniRefund_SettingService_ProductGroupVats_CreateProductGroupVatDto,
      },
      editFormSchema: {
        formPositions: ["productGroupId", "countryId", "vatId", "active"],
        schema:
          $UniRefund_SettingService_ProductGroupVats_UpdateProductGroupVatDto,
      },
      tableSchema: {
        excludeList: [
          "id",
          "creationTime",
          "creatorId",
          "lastModificationTime",
          "lastModifierId",
          "isDeleted",
          "deleterId",
          "deletionTime",
        ],
        schema: $UniRefund_SettingService_ProductGroupVats_ProductGroupVatDto,
      },
    },
    taxOffices: {
      title: "Tax Offices",
      filterBy: "",
      createFormSchema: {
        formPositions: ["productGroupId", "countryId", "vatId", "active"],
        schema:
          $UniRefund_SettingService_ProductGroupVats_CreateProductGroupVatDto,
      },
      editFormSchema: {
        formPositions: ["productGroupId", "countryId", "vatId", "active"],
        schema:
          $UniRefund_SettingService_ProductGroupVats_UpdateProductGroupVatDto,
      },
      tableSchema: {
        excludeList: [
          "id",
          "creationTime",
          "creatorId",
          "lastModificationTime",
          "lastModifierId",
          "isDeleted",
          "deleterId",
          "deletionTime",
        ],
        schema: $UniRefund_SettingService_ProductGroupVats_ProductGroupVatDto,
      },
    },
  },
};
