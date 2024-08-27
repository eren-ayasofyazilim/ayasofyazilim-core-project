"use client";

import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getBaseLink } from "src/utils";

interface LayoutProps {
  children: JSX.Element;
  params: { lang: string; type: string };
}

export default function Layout({ children, params }: LayoutProps) {
  const pathname = usePathname();
  const path = pathname.split("templates/")[1];

  const navbarItems = [
    {
      name: "New Rebate",
      id: "new-rebate-template",
      link: getBaseLink(
        "contracts/rebates/templates/new-rebate-template",
        true,
        params.lang,
        true,
        "admin",
      ),
    },
    {
      name: "Preview Template",
      id: "new-rebate-template/preview",
      link: getBaseLink(
        "contracts/rebates/templates/new-rebate-template/preview",
        true,
        params.lang,
        true,
        "admin",
      ),
    },
  ];
  return (
    <SectionLayout
      defaultActiveSectionId={path}
      linkElement={Link}
      sections={navbarItems}
      vertical={false}
    >
      <SectionLayoutContent sectionId={path}>{children}</SectionLayoutContent>
    </SectionLayout>
  );
}
