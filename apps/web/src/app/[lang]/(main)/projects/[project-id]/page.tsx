"use client";
import SectionLayout, {
  defaultDataForSectionLayout,
} from "@repo/ayasofyazilim-ui/templates/section-layout";
import { useState } from "react";

export default function Page() {
  const [activeSectionId, setActiveSectionId] = useState<string>(
    "about-the-project-0"
  );
  return (
    <SectionLayout
      sections={defaultDataForSectionLayout}
      activeSectionId={activeSectionId}
      setActiveSectionId={setActiveSectionId}
      openOnNewPage={false}
    />
  );
}
