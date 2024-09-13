export type NavbarItemType = {
  key: string;
  parentNavbarItemKey: string | null;
  displayName: string;
  description: string;
  href: string | null;
  icon: string;
  displayOrder: number;
  subNavbarItems: NavbarItemType[] | null;
};
