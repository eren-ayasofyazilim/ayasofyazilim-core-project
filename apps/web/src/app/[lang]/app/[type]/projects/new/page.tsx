"use server";

import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout";
import { getResourceData } from "src/language-data/Projects/projects";
import { getBaseLink } from "src/utils";
import NewProjectForm from "./form";

export default async function Page({ params }: { params: { lang: string } }) {
  const { languageData, resources } = await getResourceData(params.lang);
  const navbarItems = [
    {
      id: "general",
      link: getBaseLink(`projects/new`, true),
      name: "Create Project",
    },
  ];
  return (
    <SectionLayout
      content={
        <div className="w-full mx-auto max-w-3xl">
          <div className="flex flex-col items-center justify-start mb-8 w-full">
            <div className="flex-row p-4 w-10/12 ">
              <NewProjectForm languageData={languageData} />
            </div>
          </div>
        </div>
      }
      defaultActiveSectionId="general"
      openOnNewPage
      sections={navbarItems}
    />
  );
}
