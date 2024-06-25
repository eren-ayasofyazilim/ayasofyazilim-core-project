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
  DollarSign,
  Projector,
} from "lucide-react";
import { getBaseLink, getLocalizationResources } from "src/utils";
import { dataConfig } from "./dashboard/data";
import { redirect } from "next/navigation";
type navigationItmes = NavigationItem & {
  type: string | string[];
  appType?: string;
};
type LayoutProps = {
  params: { lang: string; type: string };
  children: JSX.Element;
};
const appName = process.env?.APPLICATION_NAME || "UNIREFUND";

export default async function Layout({ children, params }: LayoutProps) {
  const types = ["admin", "user", "entreperneur", "investor"];
  const { type } = params;
  if (!types.includes(type)) {
    redirect("/404");
  }
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
      {
        href: getBaseLink(`app/admin`, true, params.lang),
        title: "Admin",
      },
      {
        href: getBaseLink(`app/entreperneur`, true, params.lang),
        title: "entreperneur",
      },
      {
        href: getBaseLink(`app/investor`, true, params.lang),
        title: "investor",
      },
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
    href: getBaseLink(
      `app/${type}/dashboard/${key}/${value.default}`,
      true,
      params.lang
    ),
    icon: <Presentation className="text-slate-500 w-4" />,
  }));

  const navigationItems: navigationItmes[] = [
    {
      key: "dashboard",
      title: navbarResources?.["Menu:Dashboard"] || "Dashboard",
      href: getBaseLink("app/" + type + "/dashboard", true, params.lang),
      icon: <Presentation className="text-slate-500 w-4" />,
      submenu: dashboards,
      type: "admin",
      appType: "admin",
    },
    {
      key: "profile",
      title: navbarResources?.["Menu:Profile"] || "Profile",
      href: getBaseLink("app/" + type + "/profile", true, params.lang),
      icon: <UserCircle className="text-slate-500 w-4" />,
      type: ["admin", "user", "entreperneur", "investor"],
      appType: "all",
    },
    {
      key: "Details",
      title: "Details",
      href: getBaseLink("app/" + type + "/details", true, params.lang),
      icon: <FileBadge className="text-slate-500 w-4" />,
      type: "admin",
      appType: "unirefund",
    },
    {
      key: "company",
      title: navbarResources?.["Menu:Companies"] || "Companies",
      href: getBaseLink("app/" + type + "/company", true, params.lang),
      icon: <Building2 className="text-slate-500 w-4" />,
      type: "admin",
      appType: "unirefund",
    },
    {
      key: "countrySettings",
      title: navbarResources?.["Menu:CountrySettings"] || "Country Settings",
      href: getBaseLink(
        "app/" + type + "/country-settings/home",
        true,
        params.lang
      ),
      icon: <WrenchIcon className="text-slate-500 w-4" />,
      type: "admin",
      appType: "unirefund",
    },
    {
      key: "settings",
      title: navbarResources?.["Menu:Settings"] || "Settings",
      href: getBaseLink("app/" + type + "/settings/profile", true, params.lang),
      icon: <SlidersHorizontal className="text-slate-500 w-4" />,
      type: ["admin", "user", "entreperneur", "investor"],
      appType: "all",
    },
    {
      key: "projects",
      title: navbarResources?.["Menu:Projects"] || "Projects",
      icon: <Presentation className="text-slate-500 w-4" />,
      href: getBaseLink("app/" + type + "/projects", true, params.lang),
      type: ["admin", "entreperneur", "investor"],
      appType: "upwithcrowd",
    },
    {
      key: "languageManagement",
      title:
        navbarResources?.["Menu:LanguageManagement"] || "Language Management",
      icon: <LanguagesIcon className="text-slate-500 w-4" />,
      href: getBaseLink(
        "app/" + type + "/language-management",
        true,
        params.lang
      ),
      type: "admin",
      appType: "admin",
    },
    {
      key: "investmensts",
      title: "Investmensts",
      icon: <DollarSign className="text-slate-500 w-4" />,
      href: getBaseLink("app/" + type + "/investmensts", true, params.lang),
      type: "investor",
      appType: "admin",
    },
    {
      key: "projects1",
      title: "projects 1",
      icon: <Projector className="text-slate-500 w-4" />,
      href: getBaseLink("app/" + type + "/projects1", true, params.lang),
      type: "entreperneur",
      appType: "admin",
    },
  ];

  const filteredNavigationItems = navigationItems.filter((item) => {
    return (
      item?.type === type ||
      item?.type?.includes(type) ||
      (item.appType === "admin" && item?.appType === appName)
    );
  });

  return (
    <MainLayout
      appName={appName}
      navigationItems={filteredNavigationItems}
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
