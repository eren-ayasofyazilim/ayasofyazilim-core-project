"use client";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
// import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { getBaseLink } from "src/utils";

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  // const pathname = usePathname();
  // const path = pathname.split("en/app/admin/")[1];

  return (
    <>
      <PageHeader description="Details Page" title="Details" />
      <Card className="h-full w-full flex-1 overflow-auto p-5">{children}</Card>
    </>
  );
}
