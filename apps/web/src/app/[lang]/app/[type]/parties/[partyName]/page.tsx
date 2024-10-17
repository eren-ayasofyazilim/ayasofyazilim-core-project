"use server";

import TableComponent from "@repo/ui/TableComponent";
import { getResourceData } from "src/language-data/CRMService";
import { deleteTableRow, getTableData } from "../../../actions/api-requests";
import { dataConfigOfParties } from "../table-data";
import type { PartyNameType } from "../types";

export default async function Page({
  params,
}: {
  params: { partyName: PartyNameType; lang: string };
}) {
  const { languageData } = await getResourceData(params.lang);
  const formData = dataConfigOfParties[params.partyName];
  return (
    <TableComponent
      createOnNewPage
      createOnNewPageTitle={languageData[`${formData.translationKey}.New`]}
      deleteRequest={async (id) => {
        "use server";
        const response = await deleteTableRow(params.partyName, id);
        return response;
      }}
      deleteableRow={params.partyName !== "individuals"}
      detailedFilter={formData.detailedFilters}
      editOnNewPage={params.partyName !== "individuals"}
      fetchRequest={async (page, filter) => {
        "use server";
        const response = await getTableData(params.partyName, page, 10, filter);
        if (response.type === "success") {
          const data = response.data;
          return {
            type: "success",
            data: { items: data.items || [], totalCount: data.totalCount || 0 },
          };
        }
        return {
          type: "success",
          data: { items: [], totalCount: 0 },
        };
      }}
      languageData={languageData}
      tableSchema={formData.tableSchema}
    />
  );
}
