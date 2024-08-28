import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import Edit from "./edit";
import Preview from "./preview";

export default function Page() {
  return (
    <SectionLayout
      sections={[
        {
          id: "edit",
          name: "Edit",
        },
        {
          id: "preview",
          name: "Preview",
        },
      ]}
    >
      <SectionLayoutContent sectionId="edit">
        <Edit />
      </SectionLayoutContent>
      <SectionLayoutContent sectionId="preview">
        <Preview />
      </SectionLayoutContent>
    </SectionLayout>
  );
}
