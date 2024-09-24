"use server";
import MainAdminLayout from "@repo/ui/theme/main-admin-layout";
import { LogOut } from "lucide-react";
import unirefund from "public/unirefund.png";
import { getResourceData } from "src/language-data/AbpUiNavigation";
import { getBaseLink } from "src/utils";
import { signOutServer } from "auth-action";
import { getNavbarFromDB } from "./navbar/navbar-data";
import { getProfileMenuFromDB } from "./navbar/navbar-profile-data";

interface LayoutProps {
  params: { lang: string; type: string };
  children: JSX.Element;
}

export default async function Layout({
  children,
  params,
}: LayoutProps): Promise<JSX.Element> {
  const { lang } = params;
  const { languageData } = await getResourceData(lang);

  const prefix = "app/admin";
  const appName = process.env.APPLICATION_NAME || "UNIREFUND";
  const baseURL = getBaseLink("/", true, lang);

  const navbarFromDB = getNavbarFromDB(
    `${lang}/${prefix}`,
    languageData,
    appName,
  );
  const profileMenuProps = getProfileMenuFromDB(languageData);
  profileMenuProps.menu.secondary = [
    {
      href: undefined,
      onClick: () => {
        void signOutServer();
      },
      name: languageData.LogOut,
      icon: <LogOut className="mr-2 h-4 w-4" />,
    },
  ];
  return (
    <div className="flex h-full flex-col bg-white">
      <MainAdminLayout
        appName={appName}
        baseURL={baseURL}
        lang={lang}
        logo={unirefund}
        navbarItems={navbarFromDB}
        prefix={prefix}
        profileMenu={profileMenuProps}
      />
      <div className="flex h-full flex-col overflow-hidden px-4">
        {children}
      </div>
    </div>
  );
}
