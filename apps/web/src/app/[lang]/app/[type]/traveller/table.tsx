"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { UniRefund_TravellerService_Travellers_TravellerProfileDto } from "@ayasofyazilim/saas/TravellerService";
import { $UniRefund_TravellerService_Travellers_TravellerProfileDto } from "@ayasofyazilim/saas/TravellerService";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
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
export default function Table({
  languageData,
}: {
  languageData: TravellerServiceResource;
}) {
  const router = useRouter();
  const [travellers, setTravellers] = useState<
    UniRefund_TravellerService_Travellers_TravellerProfileDto[]
  >([]);
  const [totalCount, setTotalCount] = useState(0);
  async function fetchData() {
    const response = await getTravellers();
    if (response.type === "success") {
      const { items, totalCount: _totalCount } = response.data;
      if (typeof items === "undefined") return;
      setTravellers(items || []);
      setTotalCount(_totalCount || 0);
    }
  }
  useEffect(() => {
    void fetchData();
  }, []);

  return (
    <DataTable
      // action={[
      //   {
      //     cta: languageData.NewTraveller,
      //     type: "NewPage",
      //     href: getBaseLink("app/admin/traveller/new"),
      //   },
      // ]}
      columnsData={{
        type: "Auto",
        data: {
          tableType: $UniRefund_TravellerService_Travellers_TravellerProfileDto,
          excludeList: ["id", "userAccountId"],
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
      showView={true}
      data={travellers}
      // fetchRequest={fetchData}
      isLoading={false}
    />
  );
}
