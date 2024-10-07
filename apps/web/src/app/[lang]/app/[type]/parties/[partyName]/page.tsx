"use client";

import type { TableAction } from "@repo/ayasofyazilim-ui/molecules/tables";
import Dashboard from "@repo/ayasofyazilim-ui/templates/dashboard";
import {
  AUTO_COLUMNS_DATA,
  DELETE_ROW_ACTION,
  TableAction_CREATE_ROW_ON_NEW_PAGE,
  TableAction_EXPORT_CSV,
} from "@repo/ui/utils/table/table-utils";
import { useState } from "react";
import { getResourceDataClient } from "src/language-data/CRMService";
import { useLocale } from "src/providers/locale";
import type { PartiesResultType, PartyNameType } from "../table-data";
import { dataConfigOfParties } from "../table-data";
import { deletePartyRow, getPartyTableData } from "./action";

export default function Page({
  params,
}: {
  params: { partyName: PartyNameType; lang: string };
}) {
  const formData = dataConfigOfParties[params.partyName];
  const [tableData, setTableData] = useState<PartiesResultType>();
  const [isLoading, setIsLoading] = useState(true);

  const { resources } = useLocale();
  const languageData = getResourceDataClient(resources, params.lang);

  function getData(page: number) {
    setIsLoading(true);
    getPartyTableData(params.partyName, page, 10)
      .then((result) => {
        if (result.data) {
          setTableData(result.data);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }
  function deleteRow(row: { id: string }) {
    setIsLoading(true);
    deletePartyRow(params.partyName, row.id)
      .then((result) => {
        if (result.data) {
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
      `${params.partyName}.csv`,
    ),
  ];
  // if (formData.createFormSchema) {
  action.unshift(
    TableAction_CREATE_ROW_ON_NEW_PAGE(
      languageData,
      formData,
      `/app/admin/parties/${params.partyName}/new`,
    ),
  );
  // }

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
