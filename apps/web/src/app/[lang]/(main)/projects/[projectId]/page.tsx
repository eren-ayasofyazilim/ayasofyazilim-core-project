"use server";

import { Volo_Abp_Application_Dtos_PagedResultDto_13 } from "@ayasofyazilim/saas/ProjectService";
import TipTapEditor from "@repo/ayasofyazilim-ui/organisms/tiptap";
import SectionLayout from "@repo/ayasofyazilim-ui/templates/section-layout";
import { getProjectServiceClient } from "src/lib";

export default async function Page({ params }: any) {
  const { projectId } = params;
  const client =
    (await getProjectServiceClient().project.getApiProjectServiceProjects()) as Volo_Abp_Application_Dtos_PagedResultDto_13;

  // burada array gelmeyecek şekilde api güncellenecek
  const projectData = client?.items?.find((i) => i.id === projectId);

  if (!projectData) {
    return null;
  }

  const sectionsData = projectData.projectSectionRelations?.map((section) => ({
    key: section.name ?? "",
    id: section.name ?? "",
    name: section.name ?? "",
    value: (
      <TipTapEditor
        editorContent={JSON.parse(section.value ?? "{}")}
        editable={false}
      />
    ),
  }));

  return (
    <SectionLayout
      sections={sectionsData ?? []}
      activeSectionId={"about-the-project-0"}
      //setActiveSectionId={setActiveSectionId}
      openOnNewPage={false}
    />
  );
}
