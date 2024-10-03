import jsonToCsv from "@repo/ayasofyazilim-ui/lib/json-to-csv";
import type {
  ColumnsType,
  TableAction,
} from "@repo/ayasofyazilim-ui/molecules/tables";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { GlobalFetch } from "src/fetch";
import type { LanguageDataResourceType } from "src/language-data/language-data";
import type { TableData } from "src/utils";

export async function getTableData<T>(
  fetchLink: string,
  page: number,
  filter?: string,
) {
  const url = `${fetchLink}?page=${page}&filter=${filter}`;
  const data = await GlobalFetch<T>({
    url,
    showSuccessToast: false,
  });
  return data;
}
export async function deleteTableRow<T>(
  fetchLink: string,
  row: { id: string },
) {
  const data = await GlobalFetch<T>({
    url: fetchLink,
    options: {
      method: "DELETE",
      body: JSON.stringify(row.id),
    },
    showSuccessToast: true,
  });
  return data;
}

export function AUTO_COLUMNS_DATA(formData: TableData): ColumnsType {
  return {
    type: "Auto",
    data: {
      tableType: formData.tableSchema.schema,
      excludeList: formData.tableSchema.excludeList || [],
      actionList: [],
    },
  };
}

export function DELETE_ROW_ACTION(
  languageData: {
    Delete: string;
    Cancel: string;
    "Delete.Assurance": string;
  },
  callbackFunction: (data: { id: string }) => void,
): TableAction {
  return {
    cta: languageData.Delete,
    type: "Dialog",
    componentType: "ConfirmationDialog",
    description: languageData["Delete.Assurance"],
    cancelCTA: languageData.Cancel,
    variant: "destructive",
    callback: (data: { id: string }) => {
      callbackFunction(data);
    },
  };
}
export function EDIT_ROW_ON_NEW_PAGE(
  languageData: {
    Edit: string;
  },
  targetLink: string,
  router: AppRouterInstance,
): TableAction {
  return {
    cta: languageData.Edit,
    type: "Action",
    callback: (row: { id: string }) => {
      router.push(`${targetLink}/${row.id}`);
    },
  };
}

export function TableAction_CREATE_ROW_ON_NEW_PAGE(
  languageData: LanguageDataResourceType,
  formData: TableData,
  targetLink: string,
): TableAction {
  return {
    cta: languageData[
      `${formData.translationKey}.New` as keyof typeof languageData
    ],
    type: "NewPage",
    href: targetLink,
  };
}
export function TableAction_EXPORT_CSV<T>(
  tableData: T,
  fileName: string,
): TableAction {
  return {
    cta: `Export CSV`,
    callback: () => {
      jsonToCsv(tableData, fileName);
    },
    type: "Action",
  };
}
