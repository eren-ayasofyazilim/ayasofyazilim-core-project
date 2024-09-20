"use client";

import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import { BreadcrumbItemType, NavbarItemsFromDB } from "@repo/ui/theme/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Navbar from "./components/navbar";
import { useTheme } from "../../providers/theme";

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
  const { activeNavItem, pageBackEnabled, breadcrumbItems } = useMemo(() => {
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

    return {
      activeNavItem: item,
      pageBackEnabled,
      breadcrumbItems,
    };
  }, [pathName, navbarItems]);

  if (!activeNavItem) return null;

  return (
    <div className="flex flex-col gap-3 px-1">
      <div className="mb-28">
        <Navbar
          navbarItems={navbarItems}
          navigation={breadcrumbItems}
          prefix={prefix}
          lang={lang}
        />
      </div>
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
