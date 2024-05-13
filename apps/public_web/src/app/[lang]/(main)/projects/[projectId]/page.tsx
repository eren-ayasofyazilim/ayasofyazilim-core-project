"use server";

import { Volo_Abp_Application_Dtos_PagedResultDto_13 } from "@ayasofyazilim/saas/ProjectService";
import TipTapEditor from "@repo/ayasofyazilim-ui/organisms/tiptap";
import SectionLayout from "@repo/ayasofyazilim-ui/templates/section-layout";
import { getProjectServiceClient } from "src/lib";

import ScrollArea from "@repo/ayasofyazilim-ui/molecules/scroll-area";
import DetailsCard from "@repo/ayasofyazilim-ui/organisms/details-card";
import {
  defaultDataForSectionLayout,
  defaultProps1,
  defaultContentProps,
  images,
} from "../demo-data";
import ContentList from "components/content";

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
          canEditable={false}
        />
      ),
    })
  );

  return (
    <ScrollArea>
      <div className="flex flex-col gap-40">
        <DetailsCard
          variant="full-page"
          cardProps={{
            ...defaultProps1,
            image: images?.[(projectId ?? "default") as keyof typeof images],
          }}
        />
        <ContentList {...defaultContentProps} />
        <SectionLayout
          sections={sectionsData ?? []}
          defaultActiveSectionId={sectionsData?.[0].id ?? ""}
          openOnNewPage={false}
        />
      </div>
    </ScrollArea>
  );
}
