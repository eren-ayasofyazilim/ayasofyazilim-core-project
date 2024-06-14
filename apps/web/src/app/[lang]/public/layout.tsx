"use server";

import MainLayout from "@repo/ayasofyazilim-ui/templates/main-layout";
import Header from "@repo/ui/upwithcrowd/header";
import LanguageSelector from "@repo/ui/language-selector";
import Navbar, { linksProp } from "@repo/ui/upwithcrowd/navbar";
import { auth } from "auth";
import { signOutServer } from "auth-action";
import { getBaseLink, getLocalizationResources } from "src/utils";

type LayoutProps = {
  params: { lang: string };
  children: JSX.Element;
};

export default async function Layout({ children, params }: LayoutProps) {
  // const resources = await getLocalizationResources(params.lang);
  const resources = {};

  const session = await auth();
  const user = session?.user;
  const links: linksProp = [
    {
      text: "Yatırımcı",
      submenu: [
        {
          text: "Yatırım yap",
          href: "#",
        },
        {
          text: "Destek merkezi",
          href: "#",
        },
      ],
    },
    {
      text: "Girişimci",
      submenu: [
        {
          text: "Projeni Gönder",
          href: "#",
        },
        {
          text: "Destek merkezi",
          href: "#",
        },
        {
          text: "Gerekli Fona Nasıl Ulaşırım",
          href: "#",
        },
      ],
    },
    {
      text: "Kurumsal",
      submenu: [
        {
          text: "Hakkımızda",
          href: "#",
        },
        {
          text: "Takımımız",
          href: "#",
        },
        {
          text: "Iletisim",
          href: "#",
        },
        {
          text: "Yönetim Kurulumuz",
          href: "#",
        },
        {
          text: "Yatırım Komitesi",
          href: "#",
        },
      ],
    },
    {
      text: "Kampanyalar",
      href: "#",
    },
  ];
  return (
    <MainLayout
      wrapperClassName="h-full"
      mainClassName="p-0 md:p-0 overflow-hidden"
      childScrollArea={false}
      HeaderComponent={
        <Navbar
          topBar={
            <Header
              languageSelector={
                <LanguageSelector
                  resources={resources}
                  cultureName={params.lang}
                  baseLink={getBaseLink("", false)}
                />
              }
              user={user}
              resources={resources}
              signOutServer={signOutServer}
            />
          }
          variant="hirevision"
          links={links}
          appName={process.env.APPLICATION_NAME || "konya"}
          languageSelector={
            <LanguageSelector
              resources={resources}
              cultureName={params.lang}
              baseLink={getBaseLink("", false)}
            />
          }
        />
      }
    >
      {children}
    </MainLayout>
  );
}
