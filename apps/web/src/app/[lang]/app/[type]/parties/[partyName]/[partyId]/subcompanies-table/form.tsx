"use server";
import { SectionLayoutContent } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import TableComponent from "@repo/ui/TableComponent";
import {
  deleteTableRow,
  tableDataRequests,
} from "src/app/[lang]/app/actions/table";
import type { CRMServiceServiceResource } from "src/language-data/CRMService";
import { dataConfigOfParties } from "../../../table-data";
import type { PartyNameType } from "../../../types";

function SubCompany({
  languageData,
  partyName,
  partyId,
}: {
  languageData: CRMServiceServiceResource;
  partyName: Exclude<PartyNameType, "individuals">;
  partyId: string;
}) {
  const formData = dataConfigOfParties[partyName];

  return (
    <SectionLayoutContent sectionId="SubCompany">
      <TableComponent
        createOnNewPage
        createOnNewPageTitle={languageData[`${formData.subEntityName}.New`]}
        createOnNewPageUrl={`/app/admin/parties/${partyName}/new?parentId=${partyId}`}
        deleteRequest={async (id) => {
          "use server";
          const response = await deleteTableRow(partyName, id);
          return response;
        }}
        deleteableRow
        editOnNewPage
        editOnNewPageUrl={`/app/admin/parties/${partyName}`}
        fetchRequest={async (page) => {
          "use server";
          const requests = await tableDataRequests();
          const response = await requests[partyName].getSubCompanies({
            id: partyId,
            maxResultCount: 10,
            skipCount: page * 10,
          });
          return {
            type: "success",
            data: {
              items: response.items || [],
              totalCount: response.totalCount || 0,
            },
          };
        }}
        languageData={languageData}
        tableSchema={formData.tableSchema}
      />
    </SectionLayoutContent>
  );
}

export default SubCompany;
