"use server";

import { Card } from "@/components/ui/card";
import { SectionLayoutNavbar } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { getResourceData } from "src/language-data/Projects/projects";
import { getBaseLink } from "src/utils";
import NewProjectForm from "./form";

export default async function Page({ params }: { params: { lang: string } }) {
  const { languageData } = await getResourceData(params.lang);
  const navbarItems = [
    {
      id: "general",
      link: getBaseLink(`projects/new`, true),
      name: "Create Project",
    },
  ];
  const fundraiserId = "f9796807-de53-b21a-ac35-3a1327c610af";
  return (
    <>
      <Card>
        <SectionLayoutNavbar activeSectionId="general" sections={navbarItems} />
      </Card>

      <div className="flex-row p-4 w-10/12 max-w-3xl mx-auto">
        <NewProjectForm
          fundraiserId={fundraiserId}
          languageData={languageData}
        />
      </div>
    </>
  );
}
