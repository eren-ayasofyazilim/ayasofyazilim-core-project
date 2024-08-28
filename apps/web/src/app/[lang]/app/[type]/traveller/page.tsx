import React from "react";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import Table from "./table";

export default function Page() {
  return (
    <>
      <PageHeader
        description="Buradan yolcuları görüntüleyebilirsiniz."
        title="Yolcu"
      />
      <Card className="h-full p-5">
        <Table />
      </Card>
    </>
  );
}
