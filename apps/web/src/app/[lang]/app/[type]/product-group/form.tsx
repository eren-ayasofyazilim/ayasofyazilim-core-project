"use client";
import { Card } from "@/components/ui/card";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import type {
  columnsType,
} from "@repo/ayasofyazilim-ui/molecules/tables";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import { SectionLayoutNavbar } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { useState } from "react";

const columnData: columnsType = {
  type: "Custom",
  data: [
    {
      id: "select",
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "articleCode",
      header: "Article Code",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "unitCode",
      header: "Unit Code",
    },
    {
      accessorKey: "companyType",
      header: "Company Type",
    },
    {
      accessorKey: "active",
      header: "Active",
      cell: ({ row }: { row: any }) =>
        row.getValue("active") ? <CheckIcon /> : <Cross2Icon />,
    },
  ],
};
export default function Form({ productGroupData }: any): JSX.Element {
  const [activeSectionId, setActiveSectionId] = useState("default");
  return (
    <Card className="m-auto">
      <SectionLayoutNavbar
        activeSectionId={activeSectionId}
        onSectionChange={setActiveSectionId}
        sections={[
          { id: "default", name: "Ürün Grupları" },
          { id: "vat", name: "Ürün Gruplarının KDV'leri" },
        ]}
      />
      <div className="flex flex-col bg-white px-5">
        <DataTable
          columnsData={columnData}
          data={productGroupData}
          filterBy="result"
          rowCount={productGroupData.length}
        />
      </div>
    </Card>
  );
}
