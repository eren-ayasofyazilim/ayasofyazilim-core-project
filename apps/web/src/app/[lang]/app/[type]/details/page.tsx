"use client";
import type { ColumnsType } from "@repo/ayasofyazilim-ui/molecules/tables";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import { $schema_details, $schema_list } from "./data";

export default function Page(): JSX.Element{
  const columnsData:ColumnsType = {
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
      autoFormArgs: {
        formSchema: createZodObject(
          $schema_details,
          Object.keys($schema_details.properties)
        ),
      },
    },

  };

  return (
    <DataTable
      action={
        {
          type: "Dialog",
          autoFormArgs: {
            ...columnsData.data.autoFormArgs,
          },
          cta: "Add",
          description: "Add new item",
          callback() {
            // console.log(values, triggerData);
          },
        }
      }
      columnsData={columnsData}
      data={$schema_list}
    />
  );
}
