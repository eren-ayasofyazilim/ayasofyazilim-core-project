"use server";

import { $UniRefund_CRMService_Merchants_MerchantProfileDto } from "@ayasofyazilim/saas/CRMService";
import { getResourceData } from "src/language-data/Default";
import Table from "./table";

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
    <Table
      createOnNewPage
      deleteableRow
      editOnNewPage
      languageData={languageData}
      tableKey="merchants"
      tableSchema={tableSchema}
    />
  );
}
