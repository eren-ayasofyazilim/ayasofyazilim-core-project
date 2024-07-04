"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { toast } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  PutApiProjectServiceProjectsByIdData,
  UpwithCrowd_ProjectService_ProjectsDto_UpdateProjectDto,
  UpwithCrowd_ProjectService_Projects_ProjectDto,
} from "@ayasofyazilim/saas/ProjectService";
import CustomButton from "@repo/ayasofyazilim-ui/molecules/button";
import { NumericInput } from "@repo/ayasofyazilim-ui/molecules/numeric-input";
import { AccordionStepperHeader } from "@repo/ayasofyazilim-ui/organisms/accordion-stepper-header";
import { CircleX } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { ProjectStatusEnums } from "src/enums/project";
import {
  deleteProjectServer,
  updateProjectServer,
  updateProjectStatusServer,
} from "../action";

export const numberFormatter = new Intl.NumberFormat("tr", {
  maximumFractionDigits: 0,
});

const defaultFormValuesValidation = {
  projectName: undefined,
  projectDefinition: undefined,
  additionalFundRate: undefined,
  fundableAmount: undefined,
  overFunding: undefined,
  fundCollectionType: undefined,
};
export interface INewProjectFormProps {
  languageData: any;
  projectData: UpwithCrowd_ProjectService_Projects_ProjectDto;
  projectId: string;
  profileType: string;
}
export default function ProjectForm({
  projectId,
  languageData,
  projectData,
  profileType,
}: INewProjectFormProps) {
  const [formValues, setFormValues] =
    useState<UpwithCrowd_ProjectService_ProjectsDto_UpdateProjectDto>(
      projectData
    );
  const [formValuesValidation, setFormValuesValidation] = useState<{
    [key: string]: boolean | undefined;
  }>(defaultFormValuesValidation);
  const [formValuesValidationChanged, setFormValuesValidationChanged] =
    useState(false);

  const isAdmin = profileType === "admin";
  const [accordionTab, setAccordionTab] = useState("item-1");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const isInputEditDisabled =
    isAdmin ||
    isLoading ||
    (projectData.status !== ProjectStatusEnums.IN_DRAFT_STAGE &&
      projectData.status !== ProjectStatusEnums.NOT_APPROVED);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (JSON.stringify(formValues) === JSON.stringify(projectData)) {
        setIsSubmitDisabled(true);
        return;
      }
      setIsSubmitDisabled(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [formValues]);

  async function onEvaluateClick() {
    setIsLoading(true);
    try {
      const isApproved =
        Object.values(formValuesValidation)?.filter((i) => i === false)
          .length === 0;
      const result = await updateProjectStatusServer(
        projectId,
        isApproved
          ? ProjectStatusEnums.APPROVED
          : ProjectStatusEnums.NOT_APPROVED
      );
      setFormValuesValidationChanged(false);
      if (result.status === 200) {
        setIsSubmitDisabled(true);
        toast.success("Başarılı.");
      } else {
        toast.error(result?.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function onSaveClick() {
    setIsLoading(true);
    try {
      formValues.status = ProjectStatusEnums.IN_DRAFT_STAGE;
      const result = await updateProjectServer(
        projectId,
        formValues as PutApiProjectServiceProjectsByIdData
      );
      if (result.status === 200) {
        setIsSubmitDisabled(true);
        toast.success("Başarılı.");
      } else {
        toast.error(result?.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  async function onDeleteClick() {
    setIsLoading(true);
    try {
      await deleteProjectServer({ id: projectId });
    } catch (error: any) {
      toast.error(error.message);
      return;
    }
    toast.success("Başarılı.");
    redirect("/projects");
  }

  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={accordionTab}
        onValueChange={setAccordionTab}
      >
        <AccordionItem value="item-1" className="my-2 border">
          <AccordionStepperHeader
            checked={
              !(
                !formValues?.projectName ||
                formValues?.projectName?.length < 4 ||
                !formValues?.projectDefinition ||
                formValues?.projectDefinition?.length < 4
              ) &&
              formValuesValidation?.projectName !== false &&
              formValuesValidation?.projectDefinition !== false
            }
            children="Temel Bilgiler"
            customUncheckedIcon={
              formValuesValidation?.projectName === false &&
              formValuesValidation?.projectDefinition === false
                ? CircleX
                : undefined
            }
            customCheckedIconColor={
              formValuesValidation?.projectName &&
              formValuesValidation?.projectDefinition
                ? "text-emerald-600"
                : "text-muted-foreground"
            }
            customUncheckedIconColor={
              formValuesValidation?.projectName === false &&
              formValuesValidation?.projectDefinition === false
                ? "text-red-500"
                : "text-muted-foreground"
            }
          />

          <AccordionContent className="px-6">
            <div className="w-full">
              <div className="grid w-full items-center gap-3 mt-4">
                <Label htmlFor="projectName">
                  {languageData["ProjectName"]}
                </Label>
                <Input
                  disabled={isInputEditDisabled}
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
                  disabled={isInputEditDisabled}
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
            <div className="mt-8 flex flex-row flex-wrap justify-end gap-4">
              {projectData.status === ProjectStatusEnums.SENT_FOR_APPROVAL &&
                profileType === "admin" && (
                  <>
                    <CustomButton
                      variant="destructive"
                      className="w-[120px]"
                      onClick={() => {
                        setFormValuesValidation({
                          ...formValuesValidation,
                          projectName: false,
                          projectDefinition: false,
                        });
                        setFormValuesValidationChanged(true);
                        setAccordionTab("item-2");
                      }}
                    >
                      Reddet
                    </CustomButton>

                    <CustomButton
                      customVariant="success"
                      className="w-[120px]"
                      onClick={() => {
                        setFormValuesValidation({
                          ...formValuesValidation,
                          projectName: true,
                          projectDefinition: true,
                        });
                        setFormValuesValidationChanged(true);
                        setAccordionTab("item-2");
                      }}
                    >
                      Onayla
                    </CustomButton>
                  </>
                )}
              {profileType === "entrepreneur" && (
                <CustomButton
                  variant="secondary"
                  className="w-[120px]"
                  onClick={() => {
                    setAccordionTab("item-2");
                  }}
                >
                  İlerle
                </CustomButton>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="my-2 border">
          <AccordionStepperHeader
            checked={
              !(
                !formValues?.fundableAmount ||
                formValues?.fundableAmount === 0 ||
                !formValues?.fundCollectionType
              ) &&
              formValuesValidation?.fundableAmount !== false &&
              formValuesValidation?.fundCollectionType !== false
            }
            children="Bütçe"
            customUncheckedIcon={
              formValuesValidation?.fundCollectionType === false &&
              formValuesValidation?.fundableAmount === false
                ? CircleX
                : undefined
            }
            customCheckedIconColor={
              formValuesValidation?.fundCollectionType &&
              formValuesValidation?.fundableAmount
                ? "text-emerald-600"
                : "text-muted-foreground"
            }
            customUncheckedIconColor={
              formValuesValidation?.fundCollectionType === false &&
              formValuesValidation?.fundableAmount === false
                ? "text-red-500"
                : "text-muted-foreground"
            }
          />
          <AccordionContent className="px-6">
            <div className="w-full">
              <div className="grid w-full items-center gap-3 mt-4 ">
                <Label htmlFor="fundCollectionType">
                  {languageData["FundCollectionType"]}
                </Label>
                <div className="relative">
                  <Select
                    disabled={isInputEditDisabled}
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
                    slider={!isInputEditDisabled}
                    direction="column"
                    value={formValues?.fundableAmount || 0}
                    disabled={isInputEditDisabled}
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
            <div className="mt-8 flex flex-row flex-wrap justify-end gap-4">
              {profileType === "admin" && (
                <>
                  <CustomButton
                    variant="destructive"
                    className="w-[120px]"
                    onClick={() => {
                      setFormValuesValidation({
                        ...formValuesValidation,
                        fundCollectionType: false,
                        fundableAmount: false,
                      });
                      setFormValuesValidationChanged(true);
                      setAccordionTab("item-3");
                    }}
                  >
                    Reddet
                  </CustomButton>

                  <CustomButton
                    customVariant="success"
                    className="w-[120px]"
                    onClick={() => {
                      setFormValuesValidation({
                        ...formValuesValidation,
                        fundCollectionType: true,
                        fundableAmount: true,
                      });
                      setFormValuesValidationChanged(true);
                      setAccordionTab("item-3");
                    }}
                  >
                    Onayla
                  </CustomButton>
                </>
              )}
              {profileType === "entrepreneur" && (
                <CustomButton
                  variant="secondary"
                  className="w-[120px]"
                  onClick={() => {
                    setAccordionTab("item-3");
                  }}
                >
                  İlerle
                </CustomButton>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="my-2 border">
          <AccordionStepperHeader
            checked={
              !(
                !formValues?.overFunding ||
                (formValues?.overFunding === "Y" &&
                  !formValues?.additionalFundRate)
              ) &&
              formValuesValidation?.overFunding !== false &&
              formValuesValidation?.additionalFundRate !== false
            }
            children="Ek Fonlama"
            customUncheckedIcon={
              formValuesValidation?.overFunding === false &&
              formValuesValidation?.additionalFundRate === false
                ? CircleX
                : undefined
            }
            customCheckedIconColor={
              formValuesValidation?.overFunding &&
              formValuesValidation?.additionalFundRate
                ? "text-emerald-600"
                : "text-muted-foreground"
            }
            customUncheckedIconColor={
              formValuesValidation?.overFunding === false &&
              formValuesValidation?.additionalFundRate === false
                ? "text-red-500"
                : "text-muted-foreground"
            }
          />
          <AccordionContent className="px-6">
            <div className="w-full">
              <div className="grid w-full items-center gap-3 mt-4 ">
                <Label htmlFor="overFunding">
                  {languageData["AdditionalFunding"]}
                </Label>
                <div className="relative">
                  <Select
                    disabled={isInputEditDisabled}
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
                            slider={!isInputEditDisabled}
                            disabled={isInputEditDisabled}
                            direction="column"
                            value={parseInt(
                              formValues?.additionalFundRate || "0"
                            )}
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

            <div className="mt-8 flex flex-row flex-wrap justify-end gap-4">
              {projectData.status === ProjectStatusEnums.SENT_FOR_APPROVAL &&
                profileType === "admin" && (
                  <>
                    <CustomButton
                      variant="destructive"
                      className="w-[120px]"
                      onClick={() => {
                        setFormValuesValidation({
                          ...formValuesValidation,
                          overFunding: false,
                          additionalFundRate: false,
                        });
                        setFormValuesValidationChanged(true);
                        setAccordionTab("");
                      }}
                    >
                      Reddet
                    </CustomButton>
                    <CustomButton
                      customVariant="success"
                      className="w-[120px]"
                      onClick={() => {
                        setFormValuesValidation({
                          ...formValuesValidation,
                          overFunding: true,
                          additionalFundRate: true,
                        });
                        setFormValuesValidationChanged(true);
                        setAccordionTab("");
                      }}
                    >
                      Onayla
                    </CustomButton>
                  </>
                )}
              {profileType === "entrepreneur" && (
                <CustomButton
                  variant="secondary"
                  className="w-[120px]"
                  onClick={() => {
                    setAccordionTab("");
                  }}
                >
                  İlerle
                </CustomButton>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="mt-8 flex flex-row flex-wrap justify-end gap-5">
        {projectData.status === ProjectStatusEnums.SENT_FOR_APPROVAL &&
          profileType === "admin" && (
            <form action={onEvaluateClick}>
              <CustomButton
                variant="secondary"
                isLoading={isLoading}
                disabled={
                  isLoading ||
                  !formValuesValidationChanged ||
                  Object.values(formValuesValidation)?.filter(
                    (i) => i === undefined
                  ).length !== 0
                }
                className="w-[200px]"
              >
                Değerlendirmeyi Tamamla
              </CustomButton>
            </form>
          )}
        {profileType === "entrepreneur" && (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" className="w-[120px]">
                  Projeyi Sil
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Projeyi Sil</DialogTitle>
                  <DialogDescription>
                    Projeyi silmek istediğinize emin misiniz? Bu işlem geri
                    alınamaz.
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <form action={onDeleteClick}>
                    <CustomButton
                      type="submit"
                      isLoading={isLoading}
                      disabled={isLoading}
                    >
                      Projeyi Sil
                    </CustomButton>
                  </form>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <form action={onSaveClick}>
              <CustomButton
                variant="default"
                isLoading={isLoading}
                disabled={isSubmitDisabled}
                className="w-[120px]"
              >
                Save Project
              </CustomButton>
            </form>
          </>
        )}
      </div>
    </>
  );
}
