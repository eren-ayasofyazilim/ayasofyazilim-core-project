"use client";

import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import { BreadcrumbItemType, NavbarItemsFromDB } from "@repo/ui/theme/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useTheme } from "../../providers/theme";
import Navbar from "./components/navbar";

function findActiveNavbarItem(
  navbarItems: NavbarItemsFromDB[],
  pathName: string,
) {
  let item = navbarItems?.find((i) => "/" + i.key === pathName);
  if (item) {
    return item;
  }
  let path = pathName;
  while (path.length > 1) {
    path = path.substring(0, path.lastIndexOf("/"));
    item = navbarItems?.find((i) => "/" + i.key === path);
    if (item) {
      return item;
    }
  }
  return undefined;
}

function findBreadcrumbItems(
  navbarItems: NavbarItemsFromDB[],
  activeItem: NavbarItemsFromDB | undefined,
  data: NavbarItemsFromDB[],
) {
  if (!activeItem) {
    return;
  }

  data.push(activeItem);
  const active = navbarItems.find(
    (i) => i.key === activeItem?.parentNavbarItemKey,
  );
  if (active && active?.parentNavbarItemKey !== "/") {
    return findBreadcrumbItems(navbarItems, active, data);
  }
  return data;
}

export function HeaderSection() {
  const { navbarItems, prefix, lang } = useTheme();
  const pathName = usePathname();
  const {
    activeNavItem,
    pageBackEnabled,
    breadcrumbItems,
    sectionLayoutItems,
    activeSectionLayoutItem,
  } = useMemo(() => {
    const data: NavbarItemsFromDB[] = [];
    const item = findActiveNavbarItem(navbarItems, pathName);
    const pageBackEnabled = "/" + item?.key !== pathName;

    const breadcrumbItems: BreadcrumbItemType[] = [];
    const navItems = findBreadcrumbItems(navbarItems, item, data);
    navItems?.forEach((n) => {
      const subItem = {
        ...n,
        subNavbarItems: navbarItems?.filter(
          (i) => i.parentNavbarItemKey === n.parentNavbarItemKey,
        ),
      };
      breadcrumbItems.push(subItem);
    });
    breadcrumbItems.reverse();

    const sectionLayoutItems = breadcrumbItems[
      breadcrumbItems.length - 1
    ]?.subNavbarItems?.map((item) => ({
      id: item.key,
      name: item.displayName,
      link: item.href ? "/" + item.href : undefined,
    }));

    const activeSectionLayoutItem =
      breadcrumbItems[breadcrumbItems.length - 1]?.key;

    return {
      activeNavItem: item,
      pageBackEnabled,
      breadcrumbItems,
      sectionLayoutItems,
      activeSectionLayoutItem,
    };
  }, [pathName, navbarItems]);

  if (!activeNavItem) return null;

  return (
    <div className="flex flex-col gap-3 px-1">
      <Navbar
        navbarItems={navbarItems}
        navigation={breadcrumbItems}
        activeSectionLayoutItem={activeSectionLayoutItem}
        sectionLayoutItems={sectionLayoutItems}
        prefix={prefix}
        lang={lang}
      />
      <PageHeader
        title={activeNavItem?.displayName}
        description={activeNavItem?.description}
        LinkElement={pageBackEnabled ? Link : undefined}
        href={activeNavItem?.href ? "/" + activeNavItem?.href : "#"}
      />
    </div>
  );
}

export default HeaderSection;
