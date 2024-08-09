import { Card } from "@repo/ayasofyazilim-ui/atoms/card";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import { SectionLayoutNavbar } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Page(): JSX.Element {
  return (
    <>
      <PageHeader isLoading />

      <div className="flex justify-end flex-row my-2">
        <Skeleton className="h-9 w-40 bg-gray-200" />
      </div>
      <Card className="m-auto">
        <SectionLayoutNavbar
          activeSectionId="default"
          sections={[
            { id: "default", name: "Ürün Grupları" },
            { id: "vat", name: "Ürün Gruplarının KDV'leri" },
          ]}
        />
        <div className="flex flex-col bg-white">
          {[1, 2, 3].map((i) => (
            <div
              className="border flex flex-row px-5 py-3 items-center"
              key={i}
            >
              <Skeleton className="h-7 w-7 mb-1 bg-gray-200" />
              <div className="ml-4">
                <div>
                  <Skeleton className="h-5 mb-1.5 w-full bg-gray-200 w-40" />
                </div>
                <div className="text-sm text-muted-foreground">
                  <Skeleton className="h-4 w-full bg-gray-200 w-32" />
                </div>
              </div>
              <div className="ml-auto">
                <Skeleton className="h-8 mb-1 w-full bg-gray-200 w-20" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
