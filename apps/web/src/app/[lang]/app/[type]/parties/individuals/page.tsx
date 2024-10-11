"use client";

import type { TableAction } from "@repo/ayasofyazilim-ui/molecules/tables";
import Dashboard from "@repo/ayasofyazilim-ui/templates/dashboard";
import {
  AUTO_COLUMNS_DATA,
  getTableDataServerSide,
  TableAction_EXPORT_CSV,
} from "@repo/ui/utils/table/table-utils";
import { useState } from "react";
import { dataConfigOfParties } from "../table-data";
import type { PartiesResultType } from "../types";
import { getPartyTableData } from "./action";

export default function Page() {
  const partyName = "individuals";

  const formData = dataConfigOfParties.individuals;
  const [tableData, setTableData] = useState<PartiesResultType>();
  const [isLoading, setIsLoading] = useState(true);

  function getData(page: number) {
    setIsLoading(true);
    void getTableDataServerSide(async () => {
      return await getPartyTableData(partyName, page, 10);
    }).then((result) => {
      if (result) {
        setTableData(result);
      }
      setIsLoading(false);
    });
  }
  const columnsData = AUTO_COLUMNS_DATA(formData);

  const action: TableAction[] = [
    TableAction_EXPORT_CSV<PartiesResultType | undefined>(
      tableData,
      `${partyName}.csv`,
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
