"use client";
import type {
  Volo_Abp_Application_Dtos_PagedResultDto_18 as PagedResultDto,
  UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto as RebateTableHeaderDto,
} from "@ayasofyazilim/saas/ContractService";
import { $UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto as listSchema } from "@ayasofyazilim/saas/ContractService";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/sonner";
import type {
  ColumnsType,
  TableAction,
} from "@repo/ayasofyazilim-ui/molecules/tables";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import { useRouter } from "next/navigation";
import { getBaseLink } from "src/utils";
import { getRebateTablesRebateTableHeadersTemplates } from "../../../action";

export default function Templates({
  languageData,
  // params,
}: {
  languageData: Record<string, string>;
  // params: { lang: string; type: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState<PagedResultDto>();

  useEffect(() => {
    void getRebateTablesRebateTableHeadersTemplates({})
      .then((response) => {
        if (response.type === "success") {
          setTemplates(response.data);
        } else if (response.type === "api-error") {
          toast.error(response.message || "Templates loading failed");
        } else {
          toast.error("Fatal error");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const tableSetup: ColumnsType = {
    type: "Auto",
    data: {
      tableType: listSchema,
      excludeList: [],
      positions: ["name"],
      actionList: [
        {
          type: "Action",
          cta: languageData["RebateTables.Templates.Details"],
          callback: (row: RebateTableHeaderDto) => {
            router.push(
              getBaseLink(`app/admin/contracts/rebate/templates/${row.id}`),
            );
          },
        },
      ],
    },
  };
  const tableAction: TableAction = {
    type: "NewPage",
    cta: languageData["RebateTables.Templates.Create"],
    href: getBaseLink(
      "app/admin/contracts/rebate/templates/new-rebate-template",
    ),
  };
  return (
    <DataTable
      action={tableAction}
      columnsData={tableSetup}
      data={templates?.items || []}
      isLoading={loading}
    />
  );
}
