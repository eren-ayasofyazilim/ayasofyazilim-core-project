"use server";

import LandingPageLayout from "@repo/ayasofyazilim-ui/templates/landing-page-layout";
import LanguageSelector from "@repo/ui/language-selector";
import Header from "@repo/ui/upwithcrowd/header";
import type { linksProp } from "@repo/ui/upwithcrowd/navbar";
import Navbar from "@repo/ui/upwithcrowd/navbar";
import { Projector, ShieldAlert, Worm } from "lucide-react";
import { auth } from "auth";
import { signOutServer } from "auth-action";
import { getBaseLink } from "src/utils";
import { getResourceData } from "src/language-data/AbpUiNavigation/navbar";
import { getConfig } from "../config";

interface LayoutProps {
  params: { lang: string; city: string };
  children: JSX.Element;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { languageData, resources } = await getResourceData(params.lang);
  const appName = params.city;

  const session = await auth();
  const user = session?.user;
  const links: linksProp = [
    {
      text: languageData.Investor,
      submenu: [
        {
          text: languageData.Invest,
          href: getBaseLink(`public/${appName}/projects`, true),
        },
        {
          text: languageData.SupportCenter,
          href: "#",
        },
      ],
    },
    {
      text: languageData.Entrepreneur,
      submenu: [
        {
          text: languageData.SubmitYourProject,
          href: "#",
        },
        {
          text: languageData.SupportCenter,
          href: "#",
        },
        {
          text: languageData.HowDoIFindTheNecessaryFunds,
          href: "#",
        },
      ],
    },
    {
      text: languageData.Institutional,
      submenu: [
        {
          text: languageData.AboutUs,
          href: "#",
        },
        {
          text: languageData.OurTeam,
          href: "#",
        },
        {
          text: languageData.Contact,
          href: "#",
        },
        {
          text: languageData.BoardOfDirectors,
          href: "#",
        },
        {
          text: languageData.InvestingCommittee,
          href: "#",
        },
      ],
    },
    {
      text: languageData.Campaigns,
      href: getBaseLink(`public/${appName}/projects`, true),
    },
  ];
  const configSelected = getConfig(appName);

  const userNavigation = {
    className: "bg-transparent",
    loginURL: getBaseLink(`login`, true, params.lang),
    registerURL: getBaseLink(`register`, true, params.lang),
    user,
    imageURL: "https://github.com/shadcn.png",
    menuLinks: [
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
    signOutFunction: signOutServer,
    resources,
  };
  return (
    <LandingPageLayout
      HeaderComponent={
        <Navbar
          appName={appName}
          config={configSelected}
          languageData={languageData}
          languageSelector={
            <LanguageSelector
              baseLink={getBaseLink("", false)}
              cultureName={params.lang}
              resources={resources}
            />
          }
          links={links}
          topBar={
            <Header
              languageSelector={
                <LanguageSelector
                  baseLink={getBaseLink("", false)}
                  cultureName={params.lang}
                  resources={resources}
                />
              }
              resources={resources}
              signOutServer={signOutServer}
              user={user}
            />
          }
          user={user}
          userNavigation={userNavigation}
          variant="hirevision"
        />
      }
      mainClassName="p-0 md:p-0 w-full"
    >
      {children}
    </LandingPageLayout>
  );
}
