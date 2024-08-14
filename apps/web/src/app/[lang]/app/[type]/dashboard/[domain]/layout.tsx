"use client";

import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getResourceDataClient } from "src/language-data/AbpUiNavigation/navbar";
import { useLocale } from "src/providers/locale";
import { getBaseLink } from "src/utils";
import { dataConfig } from "../data";

interface LayoutProps {
  children: JSX.Element;
  params?: any;
}

export default function Layout({ children, params }: LayoutProps) {
  const [navbarItems, setNavbarItems] = useState<any>([]);
  const { resources } = useLocale();

  const languageData = getResourceDataClient(resources);
  const pathname = usePathname();
  const path = pathname.split("dashboard/")[1];

  useEffect(() => {
    const tempNavbarItems = Object.entries(dataConfig[params.domain])
      .filter(([e]) => e !== "displayName" && e !== "default")
      .map((item: any) => {
        return {
          id: `${params.domain}/${item[0]}`,
          name: languageData[`Identity:${item[0]}`] || item[1].title || item[0],
          link: getBaseLink(
            `dashboard/${params.domain}/${item[0]}`,
            true,
            params.lang,
            true,
            params.type,
          ),
        };
      });
    setNavbarItems(tempNavbarItems);
  }, []);

  return (
    <>
      {navbarItems.length > 0 && (
        <SectionLayout
          defaultActiveSectionId={path}
          linkElement={Link}
          sections={navbarItems}
        >
          <SectionLayoutContent sectionId={path}>
            {children}
          </SectionLayoutContent>
        </SectionLayout>
      )}
    </>
  );
}
