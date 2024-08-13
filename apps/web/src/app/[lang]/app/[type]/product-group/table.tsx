"use client";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import type { ColumnsType } from "@repo/ayasofyazilim-ui/molecules/tables";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import { Card } from "@repo/ayasofyazilim-ui/atoms/card";
import { SectionLayoutNavbar } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import React, { useState } from "react";

const columnData: ColumnsType = {
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
export default function Table({ productGroupData }: any): JSX.Element {
  const [activeSectionId, setActiveSectionId] = useState("default");
  const isProductGroupProvided = Boolean(productGroupData);
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
          isLoading={!isProductGroupProvided}
          rowCount={productGroupData.length}
        />
      </div>
    </Card>
  );
}
