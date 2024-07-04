"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  UpwithCrowd_ProjectService_ProjectsDto_CreateProjectDto,
  Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto,
} from "@ayasofyazilim/saas/ProjectService";
import { default as CustomButton } from "@repo/ayasofyazilim-ui/molecules/button";
import { NumericInput } from "@repo/ayasofyazilim-ui/molecules/numeric-input";
import Stepper, {
  StepperContent,
} from "@repo/ayasofyazilim-ui/organisms/stepper";
import { CircleCheckBigIcon, CircleXIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { getBaseLink } from "src/utils";
import { createNewProjectServer } from "../action";

export const numberFormatter = new Intl.NumberFormat("tr", {
  maximumFractionDigits: 0,
});

export interface INewProjectFormProps {
  languageData: any;
}
export default function NewProjectForm({ languageData }: INewProjectFormProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [formValues, setFormValues] =
    useState<UpwithCrowd_ProjectService_ProjectsDto_CreateProjectDto>({
      additionalFundRate: "0",
      fundableAmount: 0,
    });

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [projectId, setProjectId] = useState<string>();

  async function createNewProject() {
    setLoading(true);
    const response = await createNewProjectServer(formValues);
    if (response && response.status === 200 && response?.projectData) {
      setProjectId(response?.projectData?.id);
    } else {
      setError(response?.message);
    }
    setLoading(false);
  }
  return (
    <Card className="p-6">
      <Stepper
        activeTabIndex={activeTabIndex}
        nextButtonText={languageData["Next"]}
        previousButtonText={languageData["Previous"]}
        onIndexChange={setActiveTabIndex}
      >
        <StepperContent
          title={languageData["CreateProject"]}
          canGoBack={false}
          isNextDisabled={
            !formValues?.projectName ||
            formValues?.projectName?.length < 4 ||
            !formValues?.projectDefinition ||
            formValues?.projectDefinition?.length < 4
          }
        >
          <div className="w-full">
            <h4 className="text-2xl font-bold text-black">
              {languageData["CreateProject"]}
            </h4>
            <div className="grid w-full items-center gap-3 mt-4">
              <Label htmlFor="projectName">{languageData["ProjectName"]}</Label>
              <Input
                id="projectName"
                value={formValues?.projectName || ""}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    projectName: e.target.value,
                  })
                }
              />
              <p className="text-[0.8rem] text-muted-foreground">
                {languageData["ProjectNameInfo"]}
              </p>
            </div>
            <div className="grid w-full items-center gap-3 mt-4">
              <Label htmlFor="projectDefinition">
                {languageData["ProjectDescription"]}
              </Label>
              <Textarea
                value={formValues?.projectDefinition || ""}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    projectDefinition: e.target.value,
                  })
                }
              />
              <p className="text-[0.8rem] text-muted-foreground">
                {languageData["ProjectDescriptionInfo"]}
              </p>
            </div>
          </div>
        </StepperContent>
        <StepperContent
          title={languageData["ProjectDetails"]}
          isNextDisabled={
            !formValues?.fundableAmount ||
            formValues?.fundableAmount === 0 ||
            !formValues?.fundCollectionType
          }
        >
          <div className="flex flex-col gap-2"></div>
          <div className="w-full">
            <h4 className="text-2xl font-bold text-black">
              {languageData["ProjectDetails"]}
            </h4>

            <div className="grid w-full items-center gap-3 mt-4 ">
              <Label htmlFor="fundCollectionType">
                {languageData["FundCollectionType"]}
              </Label>
              <div className="relative">
                <Select
                  value={formValues?.fundCollectionType || ""}
                  onValueChange={(value) =>
                    setFormValues({
                      ...formValues,
                      fundCollectionType: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="SHRE">
                        {languageData["FundCollectionTypeSHRE"]}
                      </SelectItem>
                      <SelectItem value="DBIT">
                        {languageData["FundCollectionTypeDBIT"]}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-[0.8rem] text-muted-foreground">
                {languageData["FundCollectionTypeInfo"]}
              </p>
            </div>
            <div className="grid w-full items-center gap-3 mt-4 ">
              <div className="relative">
                <NumericInput
                  id="fundableAmount"
                  label={languageData["FundableAmount"]}
                  max={1000000}
                  min={0}
                  subLabel={""}
                  inputLabel="₺"
                  slider
                  direction="column"
                  onValueChange={(value) => {
                    setFormValues({ ...formValues, fundableAmount: value });
                  }}
                />
                <p className="text-[0.8rem] text-muted-foreground mt-2">
                  {languageData["FundableAmountInfo"]}
                </p>
              </div>
            </div>
          </div>
        </StepperContent>
        <StepperContent
          title={languageData["AdditionalFunding"]}
          isNextDisabled={
            !formValues?.overFunding ||
            (formValues?.overFunding === "Y" && !formValues?.additionalFundRate)
          }
        >
          <div className="flex flex-col gap-2"></div>
          <div className="w-full">
            <h4 className="text-2xl font-bold text-black">
              {languageData["AdditionalFunding"]}
            </h4>

            <div className="grid w-full items-center gap-3 mt-4 ">
              <Label htmlFor="overFunding">
                {languageData["AdditionalFunding"]}
              </Label>
              <div className="relative">
                <Select
                  value={formValues?.overFunding || ""}
                  onValueChange={(value) =>
                    setFormValues({ ...formValues, overFunding: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Y">
                        {languageData["AdditionalFundingYes"]}
                      </SelectItem>
                      <SelectItem value="N">
                        {languageData["AdditionalFundingNo"]}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-[0.8rem] text-muted-foreground">
                {languageData["AdditionalFundingInfo"]}
              </p>
            </div>
            {formValues?.overFunding === "Y" && (
              <Accordion
                type="single"
                defaultValue="item-1"
                collapsible
                className="w-full"
              >
                <AccordionItem value="item-1">
                  <AccordionContent>
                    <div className="grid w-full items-center gap-3 mt-4 ">
                      <div className="relative">
                        <NumericInput
                          id="additionalFundRate"
                          label={languageData["AdditionalFundingRate"]}
                          max={20}
                          min={0}
                          subLabel={""}
                          inputLabel="%"
                          slider
                          direction="column"
                          onValueChange={(value) => {
                            setFormValues({
                              ...formValues,
                              additionalFundRate: value.toString(),
                            });
                          }}
                        />
                        <p className="text-[0.8rem] text-muted-foreground mt-2">
                          {languageData["AdditionalFundingRateInfo"]}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>
        </StepperContent>
        <StepperContent
          title={languageData["Summary"]}
          canGoBack={false}
          canGoNext={false}
        >
          <div className="flex flex-col gap-2"></div>

          {projectId && (
            <div className="flex flex-col items-center">
              <CircleCheckBigIcon size={120} color="#2dac5c" />
              <h3 className="mt-2">
                {languageData["Messages:ProjectCreated"]}
              </h3>
              <CustomButton className="mt-4">
                <Link
                  href={getBaseLink(
                    `app/entrepreneur/projects/${projectId}`,
                    true
                  )}
                >
                  {languageData["ViewProject"]}
                </Link>
              </CustomButton>
            </div>
          )}
          {error && (
            <div className="flex flex-col items-center">
              <CircleXIcon size={120} color="#fe1265" />
              <h3 className="mt-2">
                {languageData["Messages:ProjectCreationError"]}
              </h3>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          )}
          {!projectId && !error && (
            <>
              <div className="flex flex-col gap-4 bg-white p-4">
                <div className="flex items-end justify-between gap-4 w-full items-center">
                  <h3 className="text-sm font-semibold text-muted-foreground">
                    {languageData["ProjectName"]}:
                  </h3>
                  <span className="text-md font-semibold max-w-sm">
                    {formValues["projectName"]}
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4 w-full items-center">
                  <h3 className="text-sm font-semibold text-muted-foreground">
                    {languageData["ProjectDescription"]}:
                  </h3>
                  <span className="text-md font-semibold max-w-sm">
                    {formValues["projectDefinition"]}
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4 w-full items-center">
                  <h3 className="text-sm font-semibold text-muted-foreground">
                    {languageData["FundCollectionType"]}:
                  </h3>
                  <span className="text-md font-semibold max-w-sm">
                    {formValues["fundCollectionType"] === "SHRE"
                      ? languageData["FundCollectionTypeSHRE"]
                      : languageData["FundCollectionTypeDBIT"]}
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4 w-full items-center">
                  <h3 className="text-sm font-semibold text-muted-foreground">
                    {languageData["FundableAmount"]}:
                  </h3>
                  <span className="text-md font-semibold max-w-sm">
                    {numberFormatter.format(formValues["fundableAmount"] || 0)}₺
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4 w-full items-center">
                  <h3 className="text-sm font-semibold text-muted-foreground">
                    {languageData["AdditionalFunding"]}:
                  </h3>
                  <span className="text-md font-semibold max-w-sm">
                    {formValues["overFunding"] === "Y"
                      ? languageData["AdditionalFundingYes"]
                      : languageData["AdditionalFundingNo"]}
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4 w-full items-center">
                  <h3 className="text-sm font-semibold text-muted-foreground">
                    {languageData["AdditionalFundingRate"]}:
                  </h3>
                  <span className="text-md font-semibold max-w-sm">
                    {formValues["additionalFundRate"] ?? 0}%
                  </span>
                </div>
              </div>
              <CustomButton
                className="w-full mt-4"
                isLoading={loading}
                onClick={createNewProject}
              >
                {languageData["CreateProject"]}
              </CustomButton>
            </>
          )}
        </StepperContent>
      </Stepper>
    </Card>
  );
}
