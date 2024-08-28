"use client";
import { CaretSortIcon } from "@radix-ui/react-icons";
import Dashboard from "@repo/ayasofyazilim-ui/templates/dashboard";
import type { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { getBaseLink } from "src/utils";

//pasaportid, country id, country name, (residence & nationality)
const data = [
  {
    id: "bf9793cf-b402-5113-9858-3a148c836c34",
    name: "string",
    parentCompanyId: null,
    entityInformationTypeCode: 0,
    entityInformationTypeCodeName: "Individual",
    organizationId: null,
    individualId: "018258ed-6cf6-88f4-483d-3a148c836c34",
    countryId: 0,
    nationalityCountryName: "Turkey",
    residenceCountryName: "Turkey",
    passportId: "string",
  },
];
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
  passportId: string;
}
export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },

  {
    accessorKey: "passportId",
    header: () => (
      <div>
        PassportId
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => <div>{row.getValue("passportId")}</div>,
  },
  {
    accessorKey: "nationalityCountryName",
    header: () => (
      <div>
        NationalityCountryName
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => <div>{row.getValue("nationalityCountryName")}</div>,
  },
  {
    accessorKey: "residenceCountryName",
    header: () => (
      <div>
        ResidenceCountryName
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => <div>{row.getValue("residenceCountryName")}</div>,
  },
];
export default function Table() {
  const router = useRouter();
  return (
    <Dashboard
      cards={[]}
      columnsData={{
        type: "Custom",
        data: {
          columns,
          actionList: [
            {
              cta: "Edit",
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
      data={data}
      //  fetchRequest={getRoles}

      isLoading={false}
      rowCount={1}
      withCards={false}
      withTable
    />
  );
}
