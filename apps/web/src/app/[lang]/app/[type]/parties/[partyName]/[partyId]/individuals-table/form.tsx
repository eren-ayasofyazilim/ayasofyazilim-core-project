"use client";
import type { TableAction } from "@repo/ayasofyazilim-ui/molecules/tables";
import Dashboard from "@repo/ayasofyazilim-ui/templates/dashboard";
import { SectionLayoutContent } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import {
  AUTO_COLUMNS_DATA,
  EDIT_ROW_ON_NEW_PAGE,
  getTableDataServerSide,
  TableAction_EXPORT_CSV,
} from "@repo/ui/utils/table/table-utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CRMServiceServiceResource } from "src/language-data/CRMService";
import { dataConfigOfParties } from "../../../table-data";
import type { PartiesResultType, PartyNameType } from "../../../types";
import { getPartyIndividualTableData } from "../../action";

function Individual({
  languageData,
  partyName,
  partyId,
}: {
  languageData: CRMServiceServiceResource;
  partyName: Exclude<PartyNameType, "individuals">;
  partyId: string;
}) {
  const router = useRouter();
  const formData = dataConfigOfParties[partyName];
  const [tableData, setTableData] = useState<PartiesResultType>();
  const [isLoading, setIsLoading] = useState(true);
  const columnsData = AUTO_COLUMNS_DATA(formData.tableSchema);
  function getData() {
    setIsLoading(true);
    void getTableDataServerSide(async () => {
      return await getPartyIndividualTableData(partyName, partyId);
    }).then((result) => {
      if (result) {
        setTableData(result);
      }
      setIsLoading(false);
    });
  }

  columnsData.data.actionList?.push(
    EDIT_ROW_ON_NEW_PAGE(
      languageData,
      `/app/admin/parties/${partyName}`,
      router,
    ),
  );

  const action: TableAction[] = [
    TableAction_EXPORT_CSV<PartiesResultType | undefined>(
      tableData,
      `${partyName}.csv`,
    ),
  ];

  return (
    <SectionLayoutContent sectionId="individuals">
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
    </SectionLayoutContent>
  );
}

export default Individual;
