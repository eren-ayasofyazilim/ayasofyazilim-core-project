import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Table from "./table";

export default function Page(): JSX.Element {
  return (
    <>
      <PageHeader isLoading />
      <div className="flex justify-end flex-row my-2">
        <Skeleton className="h-9 w-40 bg-gray-200" />
      </div>
      <Table productGroupData={null} />
    </>
  );
}
