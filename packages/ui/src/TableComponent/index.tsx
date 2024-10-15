"use client";

import { toast } from "@repo/ayasofyazilim-ui/atoms/sonner";
import type {
  ColumnFilter,
  TableAction,
} from "@repo/ayasofyazilim-ui/molecules/tables";
import Dashboard from "@repo/ayasofyazilim-ui/templates/dashboard";
import type { FormModifier } from "@repo/ui/utils/table/table-utils";
import {
  AUTO_COLUMNS_DATA,
  DELETE_ROW_ACTION,
  EDIT_ROW_ON_NEW_PAGE,
  TableAction_CREATE_ROW_ON_NEW_PAGE,
  TableAction_EXPORT_CSV,
} from "@repo/ui/utils/table/table-utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TableComponent({
  fetchRequest,
  deleteRequest,
  tableSchema,
  createOnNewPage,
  createOnNewPageUrl,
  createOnNewPageTitle,
  deleteableRow,
  editOnNewPage,
  editOnNewPageUrl,
  detailedFilter,
  languageData,
}: {
  tableSchema: FormModifier;
  deleteableRow?: boolean;
  editOnNewPage?: boolean;
  createOnNewPage?: boolean;
  createOnNewPageUrl?: string;
  createOnNewPageTitle?: string;
  editOnNewPageUrl?: string;
  detailedFilter?: ColumnFilter[];
  fetchRequest: (page: number) => Promise<{
    type: string;
    data: { items: unknown[]; totalCount: number };
  }>;
  deleteRequest: (id: string) => Promise<{
    type: string;
  }>;
  languageData: any;
}) {
  const router = useRouter();
  const [tableData, setTableData] = useState<{
    items: unknown[];
    totalCount: number;
  }>();
  const [isLoading, setIsLoading] = useState(true);
  const isWindowExists = typeof window !== "undefined";

  function getData(page: number) {
    setIsLoading(true);
    fetchRequest(page)
      .then((res) => {
        if (res.type === "success") {
          setTableData(res?.data);
          setIsLoading(false);
        } else {
          toast.error(languageData["Fetch.Fail"]);
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.error(languageData["Fetch.Fail"]);
      });
  }
  function deleteRow(row: { id: string }) {
    setIsLoading(true);
    deleteRequest(row.id)
      .then((res) => {
        if (res.type === "success") {
          getData(0);
          toast.success(languageData["Delete.Success"]);
        } else {
          setIsLoading(false);
          toast.error(languageData["Delete.Fail"]);
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.error(languageData["Delete.Fail"]);
      });
  }

  const columnsData = AUTO_COLUMNS_DATA(tableSchema);

  if (editOnNewPage) {
    columnsData.data.actionList?.push(
      EDIT_ROW_ON_NEW_PAGE(
        languageData,
        editOnNewPageUrl || isWindowExists ? window.location.href : "",
        router,
      ),
    );
  }

  if (deleteableRow) {
    columnsData.data.actionList?.push(
      DELETE_ROW_ACTION(languageData, deleteRow),
    );
  }

  const action: TableAction[] = [
    TableAction_EXPORT_CSV<
      { items: unknown[]; totalCount: number } | undefined
    >(tableData, "export.csv"),
  ];

  if (createOnNewPage) {
    action.unshift(
      TableAction_CREATE_ROW_ON_NEW_PAGE(
        createOnNewPageTitle || languageData.New,
        createOnNewPageUrl || isWindowExists
          ? `${window.location.href}/new`
          : "",
      ),
    );
  }

  return (
    <Dashboard
      action={action}
      cards={[]}
      columnsData={columnsData}
      data={tableData?.items || []}
      detailedFilter={detailedFilter}
      fetchRequest={getData}
      isLoading={isLoading}
      rowCount={tableData?.totalCount || 0}
      withCards={false}
      withTable
    />
  );
}
