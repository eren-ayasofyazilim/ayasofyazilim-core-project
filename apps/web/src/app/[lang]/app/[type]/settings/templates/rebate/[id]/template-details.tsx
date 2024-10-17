"use client";

import { toast } from "@/components/ui/sonner";
import type { UniRefund_ContractService_Rebates_RebateTableHeaders_RebateTableHeaderDto as RebateTableHeaderDto } from "@ayasofyazilim/saas/ContractService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { getBaseLink } from "src/utils";
import {
  getRebateTablesRebateTableHeadersDetailsById,
  putRebateTablesRebateTableHeadersById,
} from "../action";
import Rebate from "../rebate";

export default function TemplateDetails({
  templateId,
  languageData,
}: {
  templateId: string;
  languageData: ContractServiceResource;
}): JSX.Element {
  const router = useRouter();
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
    <Rebate
      details={details}
      initialFeesData={details.processingFeeDetails || []}
      initialSetupData={details.rebateTableDetails || []}
      languageData={languageData}
      onSubmit={(data) => {
        void putRebateTablesRebateTableHeadersById({
          id: templateId,
          requestBody: {
            isTemplate: true, //this is necessary to save as template
            ...data,
          },
        })
          .then((response) => {
            if (response.type === "success") {
              toast.success("Rebate table saved successfully!");
            } else if (response.type === "api-error") {
              toast.error(response.data);
            } else {
              toast.error("Fatal error");
            }
          })
          .finally(() => {
            router.push(getBaseLink("/app/admin/settings/templates/rebate"));
          });
      }}
    />
  );
}
