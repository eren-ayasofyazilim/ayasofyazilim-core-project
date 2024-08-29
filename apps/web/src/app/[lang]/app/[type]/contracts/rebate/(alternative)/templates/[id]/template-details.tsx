"use client";

import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import type { UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto as RebateTableHeaderDto } from "@ayasofyazilim/saas/ContractService";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getBaseLink } from "src/utils";
import { getRebateTablesRebateTableHeadersDetailsById } from "../../../../action";
import Rebate from "../new-rebate-template/page";

export default function TemplateDetails({
  templateId,
  // languageData,
}: {
  templateId: string;
  // languageData: Record<string, string>;
}): JSX.Element {
  const [details, setDetails] = useState<RebateTableHeaderDto>();
  useEffect(() => {
    void getRebateTablesRebateTableHeadersDetailsById({
      id: templateId,
    }).then((response) => {
      if (response.type === "success") {
        setDetails(response.data);
      } else if (response.type === "api-error") {
        toast.error(response.message);
      } else {
        toast.error("Fatal error");
      }
    });
  }, []);
  if (!details) return <></>;
  return (
    <div>
      <PageHeader
        LinkElement={Link}
        description="Edit Rebate Template"
        href={getBaseLink("app/admin/contracts/rebate/templates")}
        title={`Edit '${details.name}'`}
      />
      <Card className="h-[calc(100vh-164px)] overflow-auto">
        <Rebate
          details={details}
          initialFeesData={details.processingFeeDetails || []}
          initialSetupData={details.rebateTableDetails || []}
        />
      </Card>
    </div>
  );
}
