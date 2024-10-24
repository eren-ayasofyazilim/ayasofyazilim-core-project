"use client";
import { toast } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { getBaseLink } from "src/utils";
import Rebate from "../rebate";
import { postRebateTablesRebateTableHeadersTemplate } from "../action";

export default function NewRebate({
  languageData,
}: {
  languageData: ContractServiceResource;
}) {
  const router = useRouter();
  return (
    <Rebate
      initialFeesData={[]}
      initialSetupData={[]}
      languageData={languageData}
      onSubmit={(data) => {
        void postRebateTablesRebateTableHeadersTemplate(data)
          .then((response) => {
            if (response.type === "success") {
              toast.success(
                response.message || "New rebate template created successfully",
              );
            } else if (response.type === "api-error") {
              response.data
                .split("\n")
                .forEach((error) => error.length > 0 && toast.error(error));
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
