"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
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
import { AbpForDeploy_ProjectService_ProjectsDto_CreateUpdateProjectDto } from "@ayasofyazilim/saas/ProjectService";
import { default as CustomButton } from "@repo/ayasofyazilim-ui/molecules/button";
import { NumericInput } from "@repo/ayasofyazilim-ui/molecules/numeric-input";
import Stepper, {
  StepperContent,
} from "@repo/ayasofyazilim-ui/organisms/stepper";
import { createUpdateProjectServer } from "action";
import { CircleCheckBigIcon, CircleXIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { getBaseLink } from "src/utils";

export const numberFormatter = new Intl.NumberFormat("tr", {
  maximumFractionDigits: 0,
});

export default function Page() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [formValues, setFormValues] =
    useState<AbpForDeploy_ProjectService_ProjectsDto_CreateUpdateProjectDto>({
      additionalFundRate: "0",
      fundableAmount: 0,
    });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [projectId, setProjectId] = useState<string>();

  async function createNewProject() {
    setFormSubmitted(true);
    setLoading(true);
    const response = await createUpdateProjectServer(formValues);
    if (response && response.status === 200 && response?.projectData) {
      setProjectId(response?.projectData?.id);
    }
    setLoading(false);
  }
  return (
    <div className="w-full xl:w-3/4 mx-auto">
      <div className="flex flex-col items-center justify-start mb-8 w-full">
        <div className="flex-row p-4 w-10/12 ">
          <Stepper activeTabIndex={activeTabIndex}>
            <StepperContent
              title="Proje oluşturun"
              onIndexChange={setActiveTabIndex}
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
                  Yeni proje oluştur
                </h4>
                <div className="grid w-full items-center gap-3 mt-4">
                  <Label htmlFor="projectName">Proje adı</Label>
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
                    Yatırımcıların ilgisini çekecek şekilde projenizi anlatan
                    bir başlık.
                  </p>
                </div>
                <div className="grid w-full items-center gap-3 mt-4">
                  <Label htmlFor="projectDefinition">
                    Projenin kısa açıklaması
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
                    Yatırımcıların ilgisini çekecek şekilde projenizi kısaca
                    anlatın.
                  </p>
                </div>
              </div>
            </StepperContent>
            <StepperContent
              title="Projenizin detayları"
              isNextDisabled={
                !formValues?.fundableAmount ||
                formValues?.fundableAmount === 0 ||
                !formValues?.fundCollectionType
              }
              onIndexChange={setActiveTabIndex}
            >
              <div className="flex flex-col gap-2"></div>
              <div className="w-full">
                <h4 className="text-2xl font-bold text-black">
                  Projenin Detayları
                </h4>

                <div className="grid w-full items-center gap-3 mt-4 ">
                  <Label htmlFor="fundCollectionType">Proje Tipi</Label>
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
                          <SelectItem value="SHRE">Paya dayalı</SelectItem>
                          <SelectItem value="DBIT">Borca dayalı</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-[0.8rem] text-muted-foreground">
                    Projenizin tipi.
                  </p>
                </div>
                <div className="grid w-full items-center gap-3 mt-4 ">
                  <div className="relative">
                    <NumericInput
                      id="fundableAmount"
                      label={"İstediğiniz yatırım tutarı"}
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
                      Projenizin değerlenme tutarı.
                    </p>
                  </div>
                </div>
              </div>
            </StepperContent>
            <StepperContent
              title="Ek fonlama"
              isNextDisabled={
                !formValues?.overFunding ||
                (formValues?.overFunding === "Y" &&
                  !formValues?.additionalFundRate)
              }
              onIndexChange={setActiveTabIndex}
            >
              <div className="flex flex-col gap-2"></div>
              <div className="w-full">
                <h4 className="text-2xl font-bold text-black">
                  Ek Fon Toplama
                </h4>

                <div className="grid w-full items-center gap-3 mt-4 ">
                  <Label htmlFor="overFunding">Fonlama Aşımı</Label>
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
                          <SelectItem value="Y">Evet</SelectItem>
                          <SelectItem value="N">Hayır</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-[0.8rem] text-muted-foreground">
                    Projeniz fonlanabilir tutara ulaştığında belirttiğiniz
                    miktara kadar ekstra fon toplanmaya devam edilsin mi?
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
                              label={"Ek Fon Toplama Oranı"}
                              max={100}
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
                              Projenizin fonlama aşımı durumunda toplanacak olan
                              ek fonun oranı.
                            </p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </div>
            </StepperContent>
            <StepperContent title="Özet" canGoBack={false} canGoNext={false}>
              <div className="flex flex-col gap-2"></div>

              {projectId && (
                <div className="flex flex-col items-center">
                  <CircleCheckBigIcon size={120} color="#2dac5c" />
                  <h3 className="mt-2">Proje başarıyla oluşturuldu.</h3>
                  <CustomButton className="mt-4">
                    <Link href={getBaseLink("projects/" + projectId, true)}>
                      Projeyi görüntüle
                    </Link>
                  </CustomButton>
                </div>
              )}
              {formSubmitted && !loading && !projectId && (
                <div className="flex flex-col items-center">
                  <CircleXIcon size={120} color="#fe1265" />
                  <h3 className="mt-2">
                    Proje oluşturulurken bir hata oluştu.
                  </h3>
                </div>
              )}
              {((formSubmitted && loading) || !formSubmitted) && (
                <>
                  <div className="flex flex-col gap-4 bg-white p-4">
                    <div className="flex items-end justify-between gap-4 w-full items-center">
                      <h3 className="text-sm font-semibold text-muted-foreground">
                        Proje Adı:
                      </h3>
                      <span className="text-md font-semibold max-w-sm">
                        {formValues["projectName"]}
                      </span>
                    </div>
                    <div className="flex items-end justify-between gap-4 w-full items-center">
                      <h3 className="text-sm font-semibold text-muted-foreground">
                        Proje Detayı:
                      </h3>
                      <span className="text-md font-semibold max-w-sm">
                        {formValues["projectDefinition"]}
                      </span>
                    </div>
                    <div className="flex items-end justify-between gap-4 w-full items-center">
                      <h3 className="text-sm font-semibold text-muted-foreground">
                        Proje Tipi:
                      </h3>
                      <span className="text-md font-semibold max-w-sm">
                        {formValues["fundCollectionType"] === "SHRE"
                          ? "Paya Dayalı"
                          : "Borca Dayalı"}
                      </span>
                    </div>
                    <div className="flex items-end justify-between gap-4 w-full items-center">
                      <h3 className="text-sm font-semibold text-muted-foreground">
                        Fonlanabilir Tutar:
                      </h3>
                      <span className="text-md font-semibold max-w-sm">
                        {numberFormatter.format(
                          formValues["fundableAmount"] || 0
                        )}
                        ₺
                      </span>
                    </div>
                    <div className="flex items-end justify-between gap-4 w-full items-center">
                      <h3 className="text-sm font-semibold text-muted-foreground">
                        Fonlama Aşımı:
                      </h3>
                      <span className="text-md font-semibold max-w-sm">
                        {formValues["overFunding"] === "Y" ? "Evet" : "Hayır"}
                      </span>
                    </div>
                    <div className="flex items-end justify-between gap-4 w-full items-center">
                      <h3 className="text-sm font-semibold text-muted-foreground">
                        Ek Fonlama Oranı:
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
                    Proje Oluştur
                  </CustomButton>
                </>
              )}
            </StepperContent>
          </Stepper>
        </div>
      </div>
    </div>
  );
}
