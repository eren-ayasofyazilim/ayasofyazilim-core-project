"use server";
import { Input } from "@/components/ui/input";
import LanguageSelector from "@repo/ui/language-selector";
import { MainLayout, NavigationItem } from "@repo/ui/main-layout";
import { getPermission } from "action";
import { auth } from "auth";
import { signOutServer } from "auth-action";
import {
  Building2,
  FileBadge,
  LanguagesIcon,
  Presentation,
  SlidersHorizontal,
  UserCircle,
  WrenchIcon,
} from "lucide-react";
import { getBaseLink, getLocalizationResources } from "src/utils";
import { dataConfig } from "./dashboard/data";

type LayoutProps = {
  params: { lang: string };
  children: JSX.Element;
};
const appName = process.env?.APPLICATION_NAME || "UNIREFUND";

export default async function Layout({ children, params }: LayoutProps) {
  const resources = await getLocalizationResources(params.lang);
  const navbarResources = resources?.AbpUiNavigation?.texts || {};
  const permission = await getPermission();
  const session = await auth();
  const user = session?.user;

  const userNavigation = {
    username: user?.userName ?? undefined,
    initials: user?.name?.substring(0, 2).toUpperCase(),
    email: user?.email ?? undefined,
    imageURL: "https://github.com/shadcn.png",
    menuLinks: [
      // {
      //   href: "settings/test",
      //   title: resourcesMap.settings,
      // },
    ],
    isLoggedIn: !!user,
    signOutFunction: signOutServer,
    resources: resources,
  };
  const dashboards = Object.entries(dataConfig).map(([key, value]) => ({
    key,
    title:
      navbarResources?.["Menu:" + value.displayName.replaceAll(" ", "")] ||
      value.displayName,
    href: getBaseLink(`dashboard/${key}/${value.default}`, true, params.lang),
    icon: <Presentation className="text-slate-500 w-4" />,
  }));

  const navigationItems: NavigationItem[] = [
    {
      key: "dashboard",
      title: navbarResources?.["Menu:Dashboard"] || "Dashboard",
      href: "/dashboard",
      icon: <Presentation className="text-slate-500 w-4" />,
      submenu: dashboards,
    },
    {
      key: "profile",
      title: navbarResources?.["Menu:Profile"] || "Profile",
      href: "/profile",
      icon: <UserCircle className="text-slate-500 w-4" />,
    },
    {
      key: "Details",
      title: "Details",
      href: "/details",
      icon: <FileBadge className="text-slate-500 w-4" />,
    },
    {
      key: "company",
      title: navbarResources?.["Menu:Companies"] || "Companies",
      href: "/company",
      icon: <Building2 className="text-slate-500 w-4" />,
    },
    {
      key: "countrySettings",
      title: navbarResources?.["Menu:CountrySettings"] || "Country Settings",
      href: "/country-settings",
      icon: <WrenchIcon className="text-slate-500 w-4" />,
    },
    {
      key: "settings",
      title: navbarResources?.["Menu:Settings"] || "Settings",
      href: "/settings",
      icon: <SlidersHorizontal className="text-slate-500 w-4" />,
    },
    {
      key: "projects",
      title: navbarResources?.["Menu:Projects"] || "Projects",
      icon: <Presentation className="text-slate-500 w-4" />,
      href: getBaseLink("projects", true, params.lang),
    },
    {
      key: "languageManagement",
      title:
        navbarResources?.["Menu:LanguageManagement"] || "Language Management",
      icon: <LanguagesIcon className="text-slate-500 w-4" />,
      href: getBaseLink("language-management", true, params.lang),
    },
  ];
  return (
    <MainLayout
      appName={appName}
      navigationItems={navigationItems}
      userNavigation={userNavigation}
      topBarComponent={
        <div className="w-min flex gap-4">
          <Input
            className="w-90"
            placeholder={`${resources?.AbpUi?.texts?.Search}...`}
          />
          <LanguageSelector
            menuAlign="end"
            cultureName={params.lang}
            resources={resources}
            baseLink={getBaseLink("", false)}
          />
        </div>
      }
    >
      {children}
    </MainLayout>
  );
}
