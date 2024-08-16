"use client";
import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getBaseLink } from "src/utils";

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  const pathname = usePathname();
  const path = pathname.split("en/app/admin/")[1];

  return (
    <SectionLayout
      defaultActiveSectionId={path}
      linkElement={Link}
      sections={[
        {
          id: "details",
          name: "Details",
          link: getBaseLink("app/admin/details", true),
        },
        {
          id: "add",
          name: "add",
          link: getBaseLink("app/admin/details/add", true),
        },
        {
          id: "id",
          name: "id",
          link: getBaseLink("app/admin/details/id", true),
        },
      ]}
      vertical
    >
      <div className="w-full p-5 overflow-auto h-full flex-1">{children}</div>
    </SectionLayout>
  );
}
