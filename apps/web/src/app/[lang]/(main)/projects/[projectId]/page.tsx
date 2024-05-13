"use server";

import { Volo_Abp_Application_Dtos_PagedResultDto_13 } from "@ayasofyazilim/saas/ProjectService";
import TipTapEditor from "@repo/ayasofyazilim-ui/organisms/tiptap";
import SectionLayout from "@repo/ayasofyazilim-ui/templates/section-layout";
import { getProjectServiceClient } from "src/lib";

export default async function Page({ params }: any) {
  const { projectId } = params;
  const client =
    await getProjectServiceClient().project.getApiProjectServiceProjectsById({
      id: projectId,
    });

  const projectData = client;
  if (!projectData) {
    return null;
  }
  //demo sonrası: saas güncellenecek
  // @ts-ignore
  const sectionsData = projectData.projectSectionRelationDetails?.map(
    (section: any) => ({
      key: section.name ?? "",
      id: section.sectionId ?? "",
      name: section.name ?? "",
      value: (
        <TipTapEditor
          editorContent={JSON.parse(section.value ?? "{}")}
          canEditable={true}
        />
      ),
    })
  );
  return (
    <div className="flex flex-col w-full">
      <SectionLayout
        sections={sectionsData ?? []}
        defaultActiveSectionId={sectionsData?.[0]?.id ?? ""}
        openOnNewPage={false}
      />
    </div>
  );
}
