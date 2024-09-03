import { Card } from "@/components/ui/card";
import type { TableAction } from "@repo/ayasofyazilim-ui/molecules/tables";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import { getBaseLink } from "src/utils";
import { contractsSchema, contractsData } from "./data";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";

export default function Contracts() {
  const action: TableAction = {
    type: "NewPage",
    href: getBaseLink("app/admin/contracts/contracts/new-contract"),
    cta: "Create new contract",
  };
  return (
    <>
      <PageHeader title="Contracts" description="Manage contracts" />
      <Card className="px-4">
        <DataTable
          action={action}
          columnsData={{
            data: {
              tableType: contractsSchema,
              excludeList: ["id"],
            },
            type: "Auto",
          }}
          data={contractsData}
        />
      </Card>
    </>
  );
}
