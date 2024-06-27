"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto } from "@ayasofyazilim/saas/ProjectService";
import { AccordionStepperHeader } from "@repo/ayasofyazilim-ui/organisms/accordion-stepper-header";
import TipTapEditor from "@repo/ayasofyazilim-ui/organisms/tiptap";

import { useState } from "react";
import {
  createProjectSectionRelationServer,
  updateProjectSectionRelationServer,
} from "../../action";

export interface INewProjectFormProps {
  resources: {
    [
      key: string
    ]: Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto;
  };
  projectId: string;
  sectionData: Array<{
    projectId?: string;
    sectionId?: string;
    sectionRelationId?: string;
    sectionName?: string | null;
    sectionRelationValue?: string | null;
    order?: number;
  }> | null;
}
export default function ProjectForm({
  resources,
  projectId,
  sectionData,
}: INewProjectFormProps) {
  const [formValues, setFormValues] = useState<{ [id: string]: number }>(() => {
    const data: { [id: string]: number } = {};
    sectionData?.map((section) => {
      if (section?.sectionId) {
        data[section.sectionId] = section.sectionRelationValue?.length || 0;
      }
    });
    return data;
  });
  if (!sectionData) return <></>;

  async function onSaveClick(editorId: string, editorContent: string) {
    const section = sectionData?.find((i) => i.sectionId === editorId);
    if (section?.sectionRelationValue && section.sectionId) {
      return await updateProjectSectionRelationServer(
        section.sectionId,
        editorContent
      );
    }

    return await createProjectSectionRelationServer(
      projectId,
      editorId,
      editorContent
    );
  }
  function onWordCountChanged(id: string, count: number) {
    if (formValues[id] === count) return;

    setFormValues({ ...formValues, [id]: count });
  }
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={sectionData?.[0]?.sectionId || "item"}
    >
      {sectionData?.map((section, index) => (
        <AccordionItem
          key={section?.sectionId}
          value={section?.sectionId || "item"}
          className="my-2 border"
        >
          <AccordionStepperHeader
            checked={formValues?.[section?.sectionId || "item"] > 10}
            children={section.sectionName}
          />
          <AccordionContent className="px-6">
            <div className="w-full">
              <div className="grid w-full items-center gap-3 mt-4">
                <TipTapEditor
                  canEditable={true}
                  onSaveFunction={onSaveClick}
                  onWordCountChanged={(v) => {
                    onWordCountChanged(section?.sectionId || "", v);
                  }}
                  editorId={section?.sectionId}
                  editorContent={
                    section?.sectionRelationValue
                      ? JSON.parse(section.sectionRelationValue)
                      : undefined
                  }
                  editOnStart={
                    section.sectionRelationValue || index !== 0 ? false : true
                  }
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
