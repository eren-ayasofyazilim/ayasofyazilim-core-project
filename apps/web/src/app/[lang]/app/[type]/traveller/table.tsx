"use client";
import Dashboard from "@repo/ayasofyazilim-ui/templates/dashboard";
import type { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { TravellerServiceResource } from "src/language-data/TravellerService";
import { getBaseLink } from "src/utils";
import { getTravellers } from "./actions";

export interface Payment {
  id: string;
  name: string;
  parentCompanyId: string | null;
  entityInformationTypeCode: number;
  entityInformationTypeCodeName: string;
  organizationId: string | null;
  individualId: string;
  countryId: number;
  nationalityCountryName: string;
  residenceCountryName: string;
  travelDocumentNumber: string;
}
export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },

  {
    accessorKey: "travelDocumentNumber",
    header: () => <div>Travel Document Number</div>,
    cell: ({ row }) => <div>{row.getValue("travelDocumentNumber")}</div>,
  },
  {
    accessorKey: "nationalityCountryName",
    header: () => <div>Nationality Country Name</div>,
    cell: ({ row }) => <div>{row.getValue("nationalityCountryName")}</div>,
  },
  {
    accessorKey: "residenceCountryName",
    header: () => <div>Residence Country Name</div>,
    cell: ({ row }) => <div>{row.getValue("residenceCountryName")}</div>,
  },
];

export default function Table({
  languageData,
}: {
  languageData: TravellerServiceResource;
}) {
  const router = useRouter();
  const [travellers, setTravellers] = useState<object[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  async function fetchData() {
    const response = await getTravellers();
    if (response.type === "success") {
      const { items, totalCount: _totalCount } = response;
      if (typeof items === "undefined") return;
      setTravellers(items);
      setTotalCount(_totalCount || 0);
    }
  }
  useEffect(() => {
    void fetchData();
  }, []);

  return (
    <Dashboard
      action={[
        {
          cta: languageData.NewTraveller,
          type: "NewPage",
          href: getBaseLink("app/admin/traveller/new"),
        },
      ]}
      cards={[]}
      columnsData={{
        type: "Custom",
        data: {
          columns,
          actionList: [
            {
              cta: languageData.Edit,
              type: "Action",
              callback: (originalRow: { id: string }) => {
                router.push(
                  getBaseLink(`app/admin/traveller/${originalRow.id}`),
                );
              },
            },
          ],
        },
      }}
      rowCount={totalCount}
      withCards={false}
      withTable
      data={travellers}
      // fetchRequest={fetchData}

      isLoading={false}
    />
  );
}
