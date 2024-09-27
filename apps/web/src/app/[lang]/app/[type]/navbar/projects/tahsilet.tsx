import type { NavbarItemsFromDB } from "@repo/ui/theme/types";
import { management } from "../groups";

export const tahsiletNavbarDataFromDB: NavbarItemsFromDB[] = [
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
    key: "debtors",
    displayName: "Debtors",
    description: "Manage and create Debtors.",
    href: "debtors",
    icon: "user",
    parentNavbarItemKey: "/",
    displayOrder: 1,
  },
  {
    key: "skor",
    displayName: "Skor",
    description: "Skor",
    href: "skor",
    icon: "log",
    parentNavbarItemKey: "/",
    displayOrder: 1,
  },
];
