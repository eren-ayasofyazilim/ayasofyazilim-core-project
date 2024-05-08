"use client";
import { ScrollArea } from "@repo/ayasofyazilim-ui/atoms/scroll-area";
import DetailsCard from "@repo/ayasofyazilim-ui/organisms/details-card";
import SectionLayout from "@repo/ayasofyazilim-ui/templates/section-layout";
import { useState } from "react";
import {
  defaultDataForSectionLayout,
  defaultProps1,
  defaultContentProps,
} from "../demo-data";
import ContentList from "components/content";

export default function Page() {
  const [activeSectionId, setActiveSectionId] = useState<string>(
    "about-the-project-0"
  );
  return (
    <ScrollArea>
      <div className="flex flex-col gap-[400px]">
        <DetailsCard variant="full-page" cardProps={defaultProps1} />
        <ContentList {...defaultContentProps} />
        <SectionLayout
          sections={defaultDataForSectionLayout}
          activeSectionId={activeSectionId}
          setActiveSectionId={setActiveSectionId}
          openOnNewPage={false}
        />
      </div>
    </ScrollArea>
  );
}
