"use server";

import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { getBaseLink, getLocalizationResources } from "src/utils";
import { DataTableDemo } from "./form";

export default async function Page({ params }: { params: { lang: string } }) {
  const resources = await getLocalizationResources(params.lang);
  const defaultResources = await getLocalizationResources("en");

  const navbarItems = [
    {
      id: "general",
      link: getBaseLink(`projects`, true),
      name: "Dil Yönetimi",
    },
  ];

  return (
    <SectionLayout defaultActiveSectionId="general" sections={navbarItems}>
      <SectionLayoutContent sectionId="general">
        <DataTableDemo
          defaultResources={defaultResources}
          lang={params.lang}
          resources={resources}
        />
      </SectionLayoutContent>
    </SectionLayout>
  );
}
