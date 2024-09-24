"use client";

import type { ISection } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import { useLocale } from "src/providers/locale";
import { getResourceDataClient } from "src/language-data/CustomersService";

interface LayoutProps {
  children: JSX.Element;
  params: {
    lang: string;
    type: string;
    data: string;
  };
}

type SectionNavbarItems = ISection[];

export default function Layout({ children, params }: LayoutProps) {
  const [navbarItems] = useState<SectionNavbarItems>([]);
  const { resources } = useLocale();
  const languageData = getResourceDataClient(resources, params.lang);
  const pathname = usePathname();
  const path = pathname.split("/")[1];

  return (
    <>
      <PageHeader
        description={languageData["Customer.Description"]}
        title={languageData.Customers}
      />
      <SectionLayout defaultActiveSectionId={path} sections={navbarItems}>
        <SectionLayoutContent sectionId={path}>{children}</SectionLayoutContent>
      </SectionLayout>
    </>
  );
}
