"use client";

import SectionLayout from "@repo/ayasofyazilim-ui/templates/section-layout";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { getBaseLink } from "src/utils";

const navbarItems = [
  {
    id: "profile",
    link: getBaseLink("profile", true),
    name: "General",
  },
  {
    id: "test",
    link: getBaseLink("profile/test", true),
    name: "Tiptap",
  },
];
function isPathValid(path: string) {
  return path === "" || path === "test" || path === undefined;
}
type LayoutProps = {
  children: JSX.Element;
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("profile/")?.[1] ?? "profile";

  useEffect(() => {
    if (!path || isPathValid(path) === false) {
      router.push(getBaseLink("profile", true));
    }
  }, []);

  return (
    <SectionLayout
      sections={navbarItems}
      defaultActiveSectionId={path}
      openOnNewPage={true}
      content={children}
      vertical={true}
    />
  );
}
