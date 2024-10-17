"use client";
import { toast } from "@/components/ui/sonner";
import type {
  GetApiTravellerServiceTravellersData,
  Volo_Abp_Application_Dtos_PagedResultDto_15,
} from "@ayasofyazilim/saas/TravellerService";
import { $UniRefund_TravellerService_Travellers_TravellerListProfileDto } from "@ayasofyazilim/saas/TravellerService";
import jsonToCsv from "@repo/ayasofyazilim-ui/lib/json-to-csv";
import type {
  ColumnFilter,
  FilterColumnResult,
} from "@repo/ayasofyazilim-ui/molecules/tables";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { TravellerServiceResource } from "src/language-data/TravellerService";
import { getBaseLink } from "src/utils";
import { getTravellers } from "./actions";

export default function Table({
  languageData,
}: {
  languageData: TravellerServiceResource;
}) {
  const router = useRouter();
  const [travellers, setTravellers] =
    useState<Volo_Abp_Application_Dtos_PagedResultDto_15>();
  const [loading, setLoading] = useState(true);

  type DetailedFilter = ColumnFilter & {
    name: keyof GetApiTravellerServiceTravellersData;
  };

  const filters: DetailedFilter[] = [
    {
      name: "showExpired",
      displayName: languageData["Travellers.ShowExpired"],
      type: "boolean",
      value: "true",
    },
    {
      name: "fullName",
      displayName: languageData["Travellers.FullName"],
      type: "string",
      value: "",
    },
    {
      name: "fullName",
      displayName: languageData["Travellers.FirstName"],
      type: "string",
      value: "",
    },
    {
      name: "fullName",
      displayName: languageData["Travellers.LastName"],
      type: "string",
      value: "",
    },
    {
      name: "travelDocumentNumber",
      displayName: languageData["Travellers.TravelDocumentNumber"],
      type: "string",
      value: "",
    },
    {
      name: "username",
      displayName: languageData["Travellers.UserName"],
      type: "string",
      value: "",
    },
    {
      name: "phoneNumber",
      displayName: languageData["Travellers.PhoneNumber"],
      type: "string",
      value: "",
    },
  ];

  async function fetchTravellerData(page: number, filter: FilterColumnResult) {
    setLoading(true);
    try {
      const response = await getTravellers({
        maxResultCount: 10,
        skipCount: page * 10,
        ...filter,
      });
      if (response.type === "error" || response.type === "api-error") {
        toast.error(
          `${response.status}: ${response.message || "Something went wrong."}`,
        );
        return;
      }
      setTravellers(response.data);
    } catch (error) {
      toast.error("An error occurred while fetching travellers.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DataTable
      action={[
        {
          cta: languageData["Travellers.New"],
          type: "NewPage",
          href: getBaseLink("app/admin/parties/traveller/new"),
        },
        {
          cta: `Export CSV`,
          callback: () => {
            jsonToCsv(travellers?.items || [], "travellers");
          },
          type: "Action",
        },
      ]}
      columnsData={{
        type: "Auto",
        data: {
          tableType:
            $UniRefund_TravellerService_Travellers_TravellerListProfileDto,
          excludeList: [
            "id",
            "userAccountId",
            "residenceCountryCode2",
            "nationalityCountryCode2",
          ],
          actionList: [
            {
              cta: languageData["Travellers.Edit"],
              type: "Action",
              callback: (originalRow: { id: string }) => {
                router.push(
                  getBaseLink(`app/admin/parties/traveller/${originalRow.id}`),
                );
              },
            },
          ],
        },
      }}
      data={travellers?.items || []}
      detailedFilter={filters}
      fetchRequest={fetchTravellerData}
      isLoading={loading}
      rowCount={travellers?.totalCount}
      showView
    />
  );
}
