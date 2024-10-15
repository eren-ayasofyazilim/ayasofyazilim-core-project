"use server";

import { $UniRefund_CRMService_Merchants_MerchantProfileDto } from "@ayasofyazilim/saas/CRMService";
import TableComponent from "@repo/ui/TableComponent";
import { getResourceData } from "src/language-data/Default";
import { deleteTableRow, getTableData } from "../../actions/table";

export default async function Page() {
  const { languageData } = await getResourceData("tr");

  const tableSchema = {
    schema: $UniRefund_CRMService_Merchants_MerchantProfileDto,
    excludeList: [
      "id",
      "organizationId",
      "individualId",
      "parentCompanyId",
      "entityInformationTypeCodeName",
    ],
  };

  return (
    <TableComponent
      deleteRequest={async (id) => {
        "use server";
        const response = await deleteTableRow("refund-points", id);
        return response;
      }}
      deleteableRow
      fetchRequest={async (page) => {
        "use server";
        const response = await getTableData("refund-points", page);
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
      tableSchema={tableSchema}
    />
  );
}
