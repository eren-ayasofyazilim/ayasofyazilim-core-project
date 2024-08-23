/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument -- TODO: we need to fix this*/
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
import { dataConfigOfManagement } from "../data";

interface LayoutProps {
  children: JSX.Element;
  params?: any;
}

export default function Layout({ children, params }: LayoutProps) {
  const [navbarItems, setNavbarItems] = useState<any>([]);
  const { resources } = useLocale();

  const languageData = getResourceDataClient(resources, params.lang);
  const pathname = usePathname();
  const path = pathname.split("management/")[1];

  useEffect(() => {
    const tempNavbarItems = Object.entries(
      dataConfigOfManagement[params.domain],
    )
      .filter(([e]) => e !== "displayName" && e !== "default")
      .map(([key, value]: [string, any]) => {
        return {
          id: `${params.domain}/${key}`,
          name: languageData[`setting:${key}`] || value.title || key,
          link: getBaseLink(
            `management/${params.domain}/${key}`,
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
