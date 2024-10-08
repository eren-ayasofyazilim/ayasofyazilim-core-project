"use client";
import { toast } from "@/components/ui/sonner";
import type { Volo_Abp_Application_Dtos_PagedResultDto_15 } from "@ayasofyazilim/saas/TravellerService";
import { $UniRefund_TravellerService_Travellers_TravellerListProfileDto } from "@ayasofyazilim/saas/TravellerService";
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

  async function fetchTravellerData(page: number) {
    setLoading(true);
    try {
      const response = await getTravellers({
        maxResultCount: 10,
        skipCount: page * 10,
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
          cta: languageData["Traveller.New"],
          type: "NewPage",
          href: getBaseLink("app/admin/crm/traveller/new"),
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
              cta: languageData["Traveller.Edit"],
              type: "Action",
              callback: (originalRow: { id: string }) => {
                router.push(
                  getBaseLink(`app/admin/crm/traveller/${originalRow.id}`),
                );
              },
            },
          ],
        },
      }}
      data={travellers?.items || []}
      fetchRequest={fetchTravellerData}
      isLoading={loading}
      rowCount={travellers?.totalCount}
      showView
    />
  );
}
