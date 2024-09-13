"use client";

import { usePathname } from "next/navigation";
import { BreadcrumbNavigation } from "@repo/ui/theme/breadcrumb-navigation";
import type { NavbarItemType } from "@repo/ui/theme/types";
import { useMemo } from "react";

export function getActualPath(path: string, lang: string) {
  return path.split(`/${lang}/`)[1].split("?")[0];
}

export function getActiveSubNavbarItem(
  navbarItem: NavbarItemType | undefined,
  actualPath: string,
) {
  if (!navbarItem?.subNavbarItems) return null;

  if (navbarItem.key === "/") {
    return navbarItem.subNavbarItems.find((item) =>
      actualPath.startsWith(item.key),
    );
  }

  const tempPath = actualPath.split(`${navbarItem.key}/`)[1]?.split("/")[0];
  if (!tempPath) return null;

  const subPath = `${navbarItem.key}/${tempPath}`;
  return navbarItem.subNavbarItems.find((item) => item.key === subPath);
}
//Yeni tasarıma göre yapıldı, eski tasarıma uyarlandı, değişecek.
export function BreadcrumbCallback({
  navbarItems,
  lang,
}: {
  navbarItems: NavbarItemType[];
  lang: string;
}) {
  const pathName = usePathname();
  const actualPath = getActualPath(pathName, lang);
  const {
    navigation,
    // mainNavbarItem,
    // subNavbarItem,
    // sectionNavbarItem,
    // activeNavbarItem,
  } = useMemo(() => {
    const nav: NavbarItemType[] = [navbarItems[0]];
    let navItem = getActiveSubNavbarItem(nav[0], actualPath);
    while (navItem) {
      nav.push(navItem);
      navItem = getActiveSubNavbarItem(navItem, actualPath);
    }
    return {
      navigation: nav,
      //   mainNavbarItem: nav?.[1],
      //   subNavbarItem: nav?.[2],
      //   sectionNavbarItem: nav?.[3],
      //   activeNavbarItem: nav?.[nav.length - 1],
    };
  }, [navbarItems, pathName]);

  return <BreadcrumbNavigation navigation={navigation} />;
}
