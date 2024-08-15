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

const settingsCovnertor = {
  unitCode: {
    data: ["Qnt", "Bag", "Box"],
    type: "enum",
  },
  companyType: {
    data: [
      "Government",
      "Tax free",
      "Customs",
      "Refund point",
      "Merchant",
      "Exchange",
      "Tour guide",
    ],
    type: "enum",
  },
};

export const dataConfigOfManagement: Record<string, any> = {
  setting: {
    displayName: "Setting",
    default: "vats",
    vats: {
      title: "Vat",
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
    productGroups: {
      title: "Product Group",
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
        convertors: {
          ...settingsCovnertor,
        },
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
        convertors: { ...settingsCovnertor },
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
        convertors: {
          ...settingsCovnertor,
        },
      },
    },
    productGroupsVats: {
      title: "Product Group VAT",
      filterBy: "",
      createFormSchema: {
        formPositions: ["productGroupId", "countryId", "vatId", "active"],
        schema:
          $UniRefund_SettingService_ProductGroupVats_CreateProductGroupVatDto,
        convertors: {
          // productGroupId: {
          //   data: () => {
          //     return fetch(getBaseLink("api/management/productGroups")).then(
          //       (data) => data.json(),
          //     );
          //   },
          //   get: "name",
          //   post: "id",
          //   type: "async",
          // },
          // vatId: {
          //   data: () => {
          //     return fetch(getBaseLink("api/management/vats")).then((data) =>
          //       data.json(),
          //     );
          //   },
          //   get: "percent",
          //   post: "id",
          //   type: "async",
          // },
        },
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
