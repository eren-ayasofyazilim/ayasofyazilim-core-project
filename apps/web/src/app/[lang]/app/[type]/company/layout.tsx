"use client";

import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const navbarItems = [
  {
    name: "Merchants",
    id: "merchants",
  },

  {
    name: "Refund Points",
    id: "refund_points",
  },
  {
    name: "Customs",
    id: "customs",
  },

  {
    name: "Tax Free",
    id: "tax_free",
  },
  {
    name: "Tax Offices",
    id: "tax_offices",
  },
];
function isPathValid(path: string) {
  const validPaths = navbarItems.map((item) => item.id);
  return validPaths.includes(path) || path === undefined;
}

type LayoutProps = {
  children: JSX.Element;
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("company/")?.[1];

  useEffect(() => {
    if (!path || isPathValid(path) === false) {
      router.push("company/merchants");
    }
  }, []);

  return (
    <div>
      <SectionLayout
        sections={navbarItems}
        defaultActiveSectionId={path}
        openOnNewPage={true}
        content={children}
        contentClassName="block"
        vertical={false}
      />
    </div>
  );
}
