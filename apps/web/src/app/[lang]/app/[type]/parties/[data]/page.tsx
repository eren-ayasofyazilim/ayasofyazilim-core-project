"use client";

import type { TableAction } from "@repo/ayasofyazilim-ui/molecules/tables";
import Dashboard from "@repo/ayasofyazilim-ui/templates/dashboard";
import {
  AUTO_COLUMNS_DATA,
  DELETE_ROW_ACTION,
  deleteTableRow,
  getTableData,
  TableAction_EXPORT_CSV,
} from "@repo/ui/utils/table/table-utils";
import { useState } from "react";
import { getResourceDataClient } from "src/language-data/CRMService";
import { useLocale } from "src/providers/locale";
import { getBaseLink } from "src/utils";
import type { PartiesResultType } from "../table-data";
import { dataConfigOfParties } from "../table-data";

export default function Page({
  params,
}: {
  params: { data: string; lang: string };
}) {
  const fetchLink = getBaseLink(`/api/parties/${params.data}`);
  const formData = dataConfigOfParties[params.data];
  const [tableData, setTableData] = useState<PartiesResultType>();
  const [isLoading, setIsLoading] = useState(true);

  const { resources } = useLocale();
  const languageData = getResourceDataClient(resources, params.lang);

  function getData(page: number, filter?: string) {
    setIsLoading(true);
    getTableData<PartiesResultType>(fetchLink, page, filter)
      .then((data) => {
        if (data) {
          setTableData(data);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }
  function deleteRow(row: { id: string }) {
    setIsLoading(true);
    deleteTableRow(fetchLink, row)
      .then((data) => {
        if (data) {
          getData(0);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  const columnsData = AUTO_COLUMNS_DATA(formData);
  columnsData.data.actionList?.push(DELETE_ROW_ACTION(languageData, deleteRow));
  const action: TableAction[] = [
    TableAction_EXPORT_CSV<PartiesResultType | undefined>(
      tableData,
      `${params.data}.csv`,
    ),
  ];

  return (
    <Dashboard
      action={action}
      cards={[]}
      columnsData={columnsData}
      data={tableData?.items || []}
      fetchRequest={getData}
      isLoading={isLoading}
      rowCount={tableData?.totalCount || 0}
      withCards={false}
      withTable
    />
  );
}
