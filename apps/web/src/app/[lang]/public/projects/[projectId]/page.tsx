"use server";

import TipTapEditor from "@repo/ayasofyazilim-ui/organisms/tiptap";
import { getProjectServiceClient } from "src/lib";

import ProjectPage from "@repo/ui/upwithcrowd/project/project-page";
import { auth } from "auth";
import { ProjectStatusEnums } from "src/enums/project";
import { getResourceData } from "src/language-data/Projects/projects";

export default async function Page({
  params,
}: {
  params: { projectId: string; lang: string };
}) {
  const { projectId, lang } = params;
  const { languageData, resources } = await getResourceData(lang);

  const { project: projectData, projectSectionRelations: projectSectionData } =
    await getProjectServiceClient().project.getApiProjectServiceProjectsDetailById(
      { id: projectId }
    );

  if (!projectData) return null;

  const session = await auth();
  const user = session?.user;
  const sectionsData =
    projectSectionData?.map((section: any, index) => ({
      key: section.sectionName || "" + index,
      id: section.sectionName.replaceAll(" ", ""),
      name: section.sectionName,
      value: (
        <TipTapEditor
          editorContent={JSON.parse(section.sectionRelationValue || "{}")}
          canEditable={false}
        />
      ),
    })) || [];

  // sectionsData.push({
  //   key: "invest",
  //   id: "invest",
  //   name: languageData.Invest,
  //   value: (
  //     <Invest
  //       user={user}
  //       languageData={languageData}
  //       name={projectData.projectName || ""}
  //       description={projectData.projectDefinition || ""}
  //       investmentDetails={investmentDetails}
  //     />
  //   ),
  // });

  return (
    <ProjectPage
      projectData={projectData}
      sectionsData={sectionsData}
      languageData={languageData}
      ProjectStatusEnums={ProjectStatusEnums}
    />
  );
}
