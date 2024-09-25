import type { NavbarItemsFromDB } from "@repo/ui/theme/types";
import { management } from "../groups";

export const ayshopgoNavbarDataFromDB: NavbarItemsFromDB[] = [
  {
    key: "/",
    displayName: "Home",
    description: "Go back to the home page.",
    href: "home",
    icon: "home",
    parentNavbarItemKey: null,
    displayOrder: 1,
  },
  {
    key: "home",
    displayName: "Home",
    description: "Go back to the home page.",
    href: "/home",
    icon: "home",
    parentNavbarItemKey: "/",
    displayOrder: 1,
  },
  ...management,
  {
    key: "customers",
    displayName: "Customers",
    description: "Access management settings and tools.",
    href: "customers",
    icon: "management",
    parentNavbarItemKey: "/",
    displayOrder: 1,
  },
];
