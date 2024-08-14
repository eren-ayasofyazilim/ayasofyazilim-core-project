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
import type { MenuAction } from "@repo/ayasofyazilim-ui/molecules/tables";

export interface FormModifier {
  actionList?: (controlledFetch: unknown, getRoles: unknown) => MenuAction[];
  formPositions?: string[];
  excludeList?: string[];
  schema: any;
  convertors?: Record<string, any>;
  dependencies?: {
    sourceField: string;
    targetField: string;
    when: (_value: any) => boolean;
  }[];
}

export interface TableData {
  createFormSchema?: FormModifier;
  editFormSchema?: FormModifier;
  tableSchema: FormModifier;
  filterBy: string;
  title?: string;
}

export const dataConfigOfManagement: Record<string, any> = {
  setting: {
    displayName: "Setting",
    default: "vats",
    vats: {
      title: "Vat",
      createFormSchema: {
        formPositions: ["percent", "minimumTotalAmount", "countryId", "active"],
        schema: $UniRefund_SettingService_Vats_CreateVatDto,
        dependencies: [],
      },
      editFormSchema: {
        formPositions: ["percent", "minimumTotalAmount", "countryId", "active"],
        schema: $UniRefund_SettingService_Vats_UpdateVatDto,
        dependencies: [],
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
        dependencies: [],
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
        dependencies: [],
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
        dependencies: [],
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
        schema: $UniRefund_SettingService_ProductGroups_ProductGroupDto,
        dependencies: [],
      },
    },
    productGroupsVats: {
      title: "Product Group VAT",
      filterBy: "",
      createFormSchema: {
        formPositions: ["productGroup", "countryId", "vat", "active"],
        schema:
          $UniRefund_SettingService_ProductGroupVats_CreateProductGroupVatDto,
        dependencies: [],
      },
      editFormSchema: {
        formPositions: ["productGroup", "countryId", "vat", "active"],
        schema:
          $UniRefund_SettingService_ProductGroupVats_UpdateProductGroupVatDto,
        dependencies: [],
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
        dependencies: [],
      },
    },
  },
};
