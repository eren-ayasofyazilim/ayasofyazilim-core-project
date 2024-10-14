"use client";

import type { TableAction } from "@repo/ayasofyazilim-ui/molecules/tables";
import Dashboard from "@repo/ayasofyazilim-ui/templates/dashboard";
import {
  AUTO_COLUMNS_DATA,
  DELETE_ROW_ACTION,
  deleteTableRowServerSide,
  EDIT_ROW_ON_NEW_PAGE,
  getTableDataServerSide,
  TableAction_CREATE_ROW_ON_NEW_PAGE,
  TableAction_EXPORT_CSV,
} from "@repo/ui/utils/table/table-utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getResourceDataClient } from "src/language-data/CRMService";
import { dataConfigOfParties } from "../table-data";
import type { PartiesResultType, PartyNameType } from "../types";
import { deletePartyRow, getPartyTableData } from "./action";

export default function Page({
  params,
}: {
  params: { partyName: Exclude<PartyNameType, "individuals">; lang: string };
}) {
  const router = useRouter();
  const languageData = getResourceDataClient(params.lang);

  const formData = dataConfigOfParties[params.partyName];
  const [tableData, setTableData] = useState<PartiesResultType>();
  const [isLoading, setIsLoading] = useState(true);

  function getData(page: number) {
    setIsLoading(true);
    void getTableDataServerSide(async () => {
      return await getPartyTableData(params.partyName, page, 10);
    }).then((result) => {
      if (result) {
        setTableData(result);
      }
      setIsLoading(false);
    });
  }
  function deleteRow(row: { id: string }) {
    setIsLoading(true);
    void deleteTableRowServerSide(async () => {
      return await deletePartyRow(params.partyName, row.id);
    }).then(() => {
      getData(0);
    });
  }

  const columnsData = AUTO_COLUMNS_DATA(formData);

  columnsData.data.actionList?.push(
    EDIT_ROW_ON_NEW_PAGE(
      languageData,
      `/app/admin/parties/${params.partyName}`,
      router,
    ),
  );
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
