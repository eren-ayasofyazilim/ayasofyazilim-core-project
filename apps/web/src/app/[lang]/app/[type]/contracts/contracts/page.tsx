import { Card } from "@/components/ui/card";
import type { TableAction } from "@repo/ayasofyazilim-ui/molecules/tables";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import { getBaseLink } from "src/utils";
import { schema } from "./data";

export default function Contracts() {
  const action: TableAction = {
    type: "NewPage",
    href: getBaseLink("app/admin/contracts/contracts/new-contract"),
    cta: "Create new contract",
  };
  return (
    <Card className="px-4">
      <DataTable
        action={action}
        columnsData={{
          data: {
            tableType: schema,
            excludeList: ["id"],
          },
          type: "Auto",
        }}
        data={[]}
      />
    </Card>
  );
}
