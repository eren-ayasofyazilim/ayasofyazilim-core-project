"use server";

import type { Metadata } from "next";
import { getLocalizationResources } from "src/utils";
import Providers from "../../providers/providers";
import "./../globals.css";

interface IRootLayoutProps {
  params: { lang: string };
  children: JSX.Element;
}

export default async function RootLayout({
  children,
  params,
}: IRootLayoutProps) {
  const resources = await getLocalizationResources(params.lang);
  if (!resources) return <></>;

  return <Providers resources={resources}>{children}</Providers>;
}
