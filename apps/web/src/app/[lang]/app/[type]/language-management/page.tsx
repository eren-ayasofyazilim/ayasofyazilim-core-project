"use server";

import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout";
import { getBaseLink, getLocalizationResources } from "src/utils";
import { DataTableDemo } from "./form";

export default async function Page({ params }: { params: { lang: string } }) {
  const resources = await getLocalizationResources(params.lang);
  const defaultResources = await getLocalizationResources("en");

  const navbarItems = [
    {
      id: "general",
      link: getBaseLink(`projects`, true),
      name: "Dil",
    },
  ];

  return (
    <SectionLayout
      content={
        <div className="relative w-full container mt-4">
          <div className="flex flex-col gap-2">
            <DataTableDemo
              defaultResources={defaultResources}
              lang={params.lang}
              resources={resources}
            />
          </div>
        </div>
      }
      defaultActiveSectionId="general"
      openOnNewPage
      sections={navbarItems}
    />
  );
}
