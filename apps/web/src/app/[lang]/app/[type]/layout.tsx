/* eslint-disable @typescript-eslint/no-unsafe-assignment -- TODO: we need to fix this*/
"use server";
import LanguageSelector from "@repo/ui/language-selector";
import type { NavigationItem } from "@repo/ui/main-layout";
import { MainLayout } from "@repo/ui/main-layout";
import { ProfileMenu } from "@repo/ui/upwithcrowd/profile-menu";
import {
  DollarSign,
  FileBadge,
  Folder,
  Home,
  LanguagesIcon,
  LayoutDashboard,
  Presentation,
  Projector,
  ShieldAlert,
  SlidersHorizontal,
  UserCircle,
  Worm,
  WrenchIcon,
} from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "auth";
import { signOutServer } from "auth-action";
import { getResourceData } from "src/language-data/AbpUiNavigation/navbar";
import { generateNavigationItems, getBaseLink } from "src/utils";
import { dataConfigOfCrm } from "./crm/data";
import { dataConfig } from "./dashboard/data";
import { dataConfigOfManagement } from "./management/data";

type NavigationItmes = NavigationItem & {
  type: string | string[];
  appType?: string;
};
interface LayoutProps {
  params: { lang: string; type: string };
  children: JSX.Element;
}
const appName = process.env.APPLICATION_NAME || "UNIREFUND";

export default async function Layout({
  children,
  params,
}: LayoutProps): Promise<JSX.Element> {
  const types = ["admin", "user", "entrepreneur", "investor"];
  const { type } = params;
  if (!types.includes(type)) {
    redirect("/404");
  }
  const navbarResources = { "Menu:Reports": "Reports" };
  const { languageData, resources } = await getResourceData(params.lang);

  const session = await auth();
  const user = session?.user;

  const arrayOf = [
    "openiddict",
    "admin",
    "saas",
    "identity",
    "auditLogs",
    "textTemplates",
  ];
  const arrayOfManagement = ["setting"];
  const arrayOfCrm = ["companies"];

  const userNavigation = {
    username: user?.userName ?? "undefined",
    initials: user?.name?.substring(0, 2).toUpperCase(),
    user,
    email: user?.email ?? undefined,
    imageURL: "https://github.com/shadcn.png",
    menuLinks: [
      {
        href: getBaseLink(`public`, true, params.lang),
        title: languageData.HomePage,
        icon: <Home className="mr-2 h-4 w-4" />,
      },
      {
        href: getBaseLink(`app/admin`, true, params.lang),
        title: languageData.AdminCenter,
        icon: <ShieldAlert className="mr-2 h-4 w-4" />,
      },
      {
        href: getBaseLink(`app/entrepreneur`, true, params.lang),
        title: languageData.EntrepreneurCenter,
        icon: <Projector className="mr-2 h-4 w-4" />,
      },
      {
        href: getBaseLink(`app/investor`, true, params.lang),
        title: languageData.InvestorCenter,
        icon: <Worm className="mr-2 h-4 w-4" />,
      },
    ],
    isLoggedIn: Boolean(user),
    className: "bg-transparent",
    signOutFunction: signOutServer,
    languageData,
  };
  const dashboards = generateNavigationItems(
    dataConfig,
    arrayOf,
    languageData,
    type,
    "dashboard",
    params.lang,
    <Presentation className="w-4 text-slate-500" />,
  );

  const managements = generateNavigationItems(
    dataConfigOfManagement,
    arrayOfManagement,
    languageData,
    type,
    "management",
    params.lang,
    <SlidersHorizontal className="w-4 text-slate-500" />,
  );

  const crms = generateNavigationItems(
    dataConfigOfCrm,
    arrayOfCrm,
    languageData,
    type,
    "crm",
    params.lang,
    <SlidersHorizontal className="w-4 text-slate-500" />,
  );
  const navigationItems: NavigationItmes[] = [
    {
      key: "reports",
      title: navbarResources["Menu:Reports"],
      href: getBaseLink(`app/${type}/`, true, params.lang),
      icon: <LayoutDashboard className="w-4 text-slate-500" />,
      type: ["admin", "user", "entrepreneur", "investor"],
      appType: "all",
    },
    {
      key: "dashboard",
      title: languageData.Dashboard,
      href: getBaseLink(`app/${type}/dashboard`, true, params.lang),
      icon: <Presentation className="w-4 text-slate-500" />,
      submenu: dashboards,
      type: "admin",
      appType: "unirefund",
    },
    ...dashboards,
    {
      key: "management",
      title: languageData.Management,
      href: getBaseLink(`app/${type}/management`, true, params.lang),
      icon: <Folder className="w-4 text-slate-500" />,
      submenu: managements,
      type: "admin",
      appType: "unirefund",
    },
    ...managements,
    {
      key: "crm",
      title: languageData.Crm,
      href: getBaseLink(`app/${type}/crm`, true, params.lang),
      icon: <Folder className="w-4 text-slate-500" />,
      submenu: crms,
      type: "admin",
      appType: "unirefund",
    },
    ...crms,
    {
      key: "profile",
      title: languageData.Profile,
      href: getBaseLink(`app/${type}/profile`, true, params.lang),
      icon: <UserCircle className="w-4 text-slate-500" />,
      type: ["admin", "user", "entrepreneur", "investor"],
      appType: "upwithcrowd",
    },
    {
      key: "Details",
      title: languageData.Details,
      href: getBaseLink(`app/${type}/details`, true, params.lang),
      icon: <FileBadge className="w-4 text-slate-500" />,
      type: "admin",
      appType: "unirefund",
    },
    {
      key: "Template",
      title: languageData.Template,
      href: getBaseLink(`app/${type}/template/rebate`, true, params.lang),
      icon: <FileBadge className="w-4 text-slate-500" />,
      type: "admin",
      appType: "unirefund",
    },
    {
      key: "countrySettings",
      title: languageData.CountrySettings,
      href: getBaseLink(`app/${type}/country-settings/home`, true, params.lang),
      icon: <WrenchIcon className="w-4 text-slate-500" />,
      type: "admin",
      appType: "unirefund",
    },
    {
      key: "settings",
      title: languageData.Settings,
      href: getBaseLink(`app/${type}/settings/profile`, true, params.lang),
      icon: <SlidersHorizontal className="w-4 text-slate-500" />,
      type: ["admin", "user", "entrepreneur", "investor"],
      appType: "unirefund",
    },
    {
      key: "projects",
      title: languageData.Campaigns,
      icon: <Presentation className="w-4 text-slate-500" />,
      href: getBaseLink(`app/${type}/projects`, true, params.lang),
      type: ["admin", "entrepreneur", "investor"],
      appType: "upwithcrowd",
    },
    {
      key: "languageManagement",
      title: languageData.LanguageManagement || "Language Management",
      icon: <LanguagesIcon className="w-4 text-slate-500" />,
      href: getBaseLink(`app/${type}/language-management`, true, params.lang),
      type: "admin",
      appType: "upwithcrowd",
    },
    {
      key: "investments",
      title: "investments",
      icon: <DollarSign className="w-4 text-slate-500" />,
      href: getBaseLink(`app/${type}/investments`, true, params.lang),
      type: "investor",
      appType: "admin",
    },
    {
      key: "contracts",
      appType: "unirefund",
      type: "admin",
      title: languageData.Contracts,
      href: getBaseLink(`app/${type}/contracts`, true, params.lang),
      icon: <FileBadge className="w-4 text-slate-500" />,
      submenu: [
        {
          key: "contracts",
          title: languageData.Contracts,
          href: getBaseLink(
            `app/${type}/contracts/contracts`,
            true,
            params.lang,
          ),
        },
        {
          key: "rebateTables",
          title: languageData.RebateTables,
          href: getBaseLink(
            `app/${type}/contracts/rebate/company-settings`,
            true,
            params.lang,
          ),
        },
        {
          key: "refundTables",
          title: languageData.RefundTables,
          href: getBaseLink(
            `app/${type}/contracts/refund/refund-tables`,
            true,
            params.lang,
          ),
        },
      ],
    },
  ];

  const filteredNavigationItems = navigationItems.filter((item) => {
    return (
      item.appType === appName.toLowerCase() &&
      (item.type === type || item.type.includes(type))
    );
  });

  return (
    <MainLayout
      appName={appName}
      navigationItems={filteredNavigationItems}
      topBarComponent={
        <div className="mr-5 flex w-min gap-4">
          <ProfileMenu {...userNavigation} />
          <LanguageSelector
            baseLink={getBaseLink("", false)}
            cultureName={params.lang}
            menuAlign="end"
            resources={resources}
          />
        </div>
      }
    >
      <div className="mx-10 mt-5 h-[calc(100vh-104px)]">{children}</div>
    </MainLayout>
  );
}
