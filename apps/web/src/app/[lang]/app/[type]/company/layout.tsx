"use client";

import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const navbarItems = [
  {
    name: "Merchants",
    id: "merchants",
    link: "merchants",
  },

  {
    name: "Refund Points",
    id: "refund_points",

    link: "refund_points",
  },
  {
    name: "Customs",
    id: "customs",

    link: "customs",
  },

  {
    name: "Tax Free",
    id: "tax_free",

    link: "tax_free",
  },
  {
    name: "Tax Offices",
    id: "tax_offices",

    link: "tax_offices",
  },
];
function isPathValid(path: string) {
  const validPaths = navbarItems.map((item) => item.id);
  return validPaths.includes(path);
}

interface LayoutProps {
  children: JSX.Element;
}

const pageHeader = {
  merchants: {
    title: "Satıcılar",
    description:
      "Satıcıları buradan oluşturabilir veya başka bir yerde güncelleyebilirsiniz.",
    link: "company/merchants",
  },
  refund_points: {
    title: "Iade Puanları",
    description:
      "İade puanlarını buradan oluşturabilir veya başka bir yerde güncelleyebilirsiniz.",
    link: "company/merchants",
  },
  customs: {
    title: "Temsilciler",
    description:
      "Temsilcileri buradan oluşturabilir veya başka bir yerde güncelleyebilirsiniz.",
    link: "company/merchants",
  },
  tax_free: {
    title: "Vergi Dönuşümleri",
    description:
      "Vergi dönuşümlerini buradan oluşturabilir veya başka bir yerde güncelleyebilirsiniz.",
    link: "company/merchants",
  },
  tax_offices: {
    title: "Vergi Ofisleri",
    description:
      "Vergi ofislerini buradan oluşturabilir veya başka bir yerde güncelleyebilirsiniz.",
  },
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("company/")[1];

  useEffect(() => {
    if (!path || !isPathValid(path)) {
      router.push("company/merchants");
    }
  }, []);

  return (
    <div>
      <PageHeader
        description={pageHeader[path as keyof typeof pageHeader].description}
        title={pageHeader[path as keyof typeof pageHeader].title}
      />
      <SectionLayout
        defaultActiveSectionId={path}
        linkElement={Link}
        sections={navbarItems}
        vertical
      >
        <SectionLayoutContent sectionId={path}>{children}</SectionLayoutContent>
      </SectionLayout>
    </div>
  );
}
