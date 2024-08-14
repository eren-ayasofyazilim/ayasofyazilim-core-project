"use client";
import type { ColumnsType } from "@repo/ayasofyazilim-ui/molecules/tables";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import { getBaseLink } from "src/utils";
import { $schema_details, $schema_list } from "./data";

export default function Page(): JSX.Element {
  const columnsData: ColumnsType = {
    type: "Auto",
    data: {
      tableType: $schema_details,
      excludeList: [],
      callback: () => {
        // console.log(data);
      },
      onDelete: () => {
        // console.log(data);
      },
      onEdit: () => {
        // console.log(data);
      },
      dialogDescription: "",
      dialogTitle: "",
      autoFormArgs: {
        formSchema: createZodObject(
          $schema_details,
          Object.keys($schema_details.properties),
        ),
      },
    },
  };

  return (
    <DataTable
      action={{
        type: "NewPage",
        cta: "Add Tag",
        href: getBaseLink("app/admin/details/add"),
      }}
      columnsData={columnsData}
      data={$schema_list}
    />
  );
}
