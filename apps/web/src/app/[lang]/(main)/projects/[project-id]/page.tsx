"use client";
import SectionLayout, {
  SectionContent,
  defaultDataForSectionLayout,
} from "@repo/ayasofyazilim-ui/templates/section-layout";
import { useState } from "react";

export default function Page() {
  // const client = getProjectServiceClient();
  // const projectData = await client.project.getApiProjectServiceProject();
  // if (!projectData) {
  //   return <div>No data</div>;
  // }
  const [activeSectionId, setActiveSectionId] = useState<string>(
    "about-the-project-0"
  );
  return (
    <SectionLayout
      sections={defaultDataForSectionLayout}
      activeSectionId={activeSectionId}
      openOnNewPage={false}
    >
      <div>
        {defaultDataForSectionLayout.map((section) => (
          <SectionContent
            className="grid-8"
            setVisibleSection={setActiveSectionId}
            sectionId={section.id}
          >
            <>{section.value}</>
          </SectionContent>
        ))}
      </div>
    </SectionLayout>
  );
}
