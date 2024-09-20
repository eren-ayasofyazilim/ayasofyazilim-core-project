"use server";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import MainAdminLayout from "@repo/ui/theme/main-admin-layout";
import { Layers, LogOut, Settings, User } from "lucide-react";
import unirefund from "public/unirefund.png";
import { getResourceData } from "src/language-data/AbpUiNavigation";
import { getBaseLink } from "src/utils";
import { getNavbarFromDB } from "./navbar/navbar-data";

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
  const profileMenuProps = {
    info: {
      name: "Neil Sims",
      email: "name@flowbite.com",
      image: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
    },
    menuTitle: languageData.Profile,
    menu: {
      account: [
        {
          icon: <User className="mr-2 h-5 w-5 text-gray-400" />,
          href: "#",
          name: languageData.Profile,
        },
        {
          href: "#",
          name: languageData.UserSettings,
          icon: <Settings className="mr-2 h-5 w-5 text-gray-400" />,
        },
      ],
      primary: [
        {
          href: "#",
          name: languageData.OurTeam,
          icon: <HeartFilledIcon className="mr-2 h-5 w-5 text-gray-400" />,
        },
        {
          href: "#",
          name: languageData.Management,
          icon: <Layers className="mr-2 h-5 w-5 text-gray-400" />,
        },
      ],
      secondary: [
        {
          href: "#",
          name: languageData.LogOut,
          icon: <LogOut className="mr-2 h-4 w-4" />,
        },
      ],
    },
  };
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
      test
      {/* <Image src={"/public/unirefund.png"} alt="s" width={100} height={100} />
      <Image src={"/unirefund.png"} alt="s" width={100} height={100} />
      <img src="/unirefund.png" /> */}
      <div className="flex h-full flex-col overflow-hidden">{children}</div>
    </div>
  );
}
