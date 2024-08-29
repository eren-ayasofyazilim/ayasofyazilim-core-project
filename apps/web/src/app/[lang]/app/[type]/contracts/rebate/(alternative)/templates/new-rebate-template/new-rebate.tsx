"use client";
import { toast } from "@/components/ui/sonner";
import Rebate from "../rebate";

export default function NewRebate({
  languageData,
}: {
  languageData: Record<string, string>;
}) {
  return (
    <Rebate
      details={{}}
      initialFeesData={[]}
      initialSetupData={[]}
      languageData={languageData}
      onSubmit={() => {
        toast.success("Not implemented");
      }}
    />
  );
}
