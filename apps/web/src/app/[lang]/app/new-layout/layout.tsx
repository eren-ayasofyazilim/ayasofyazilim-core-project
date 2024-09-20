"use server";
import MainAdminLayout from "@repo/ui/theme/main-admin-layout";
import unirefund from "public/unirefund.png";
import { getResourceData } from "src/language-data/AbpUiNavigation";
import { getBaseLink } from "src/utils";
import { getNavbarFromDB } from "./navbar/navbar-data";
import { getProfileMenuFromDB } from "./navbar/profile-menu-data";

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

  const prefix = "app/new-layout";
  const appName = process.env.APPLICATION_NAME || "UNIREFUND";
  const baseURL = getBaseLink("/", true, lang);

  const navbarFromDB = getNavbarFromDB(`${lang}/${prefix}`, languageData);
  const profileMenuProps = getProfileMenuFromDB(languageData);
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
      <div className="flex h-full flex-col overflow-hidden">{children}</div>
    </div>
  );
}
