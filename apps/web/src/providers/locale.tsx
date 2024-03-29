"use client";

import Spinner from "@repo/ayasofyazilim-ui/molecules/spinner";
import { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationDto, Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto } from "ayasofyazilim-saas";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export const LocaleContext = createContext<{
  cultureName: string | undefined;
  resources:
    | Record<
        string,
        Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto
      >
    | undefined
    | null;
  changeLocale: (cultureName: string) => void;
}>({
  cultureName: undefined,
  changeLocale: (cultureName: string) => {},
  resources: undefined,
});

export const useLocale = () => {
  return useContext(LocaleContext);
};
export const LocaleProvider = ({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) => {
  const [cultureName, setCultureName] = useState<string | undefined>(lang);
  const [resources, setResources] = useState<
    | Record<
        string,
        Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto
      >
    | undefined
    | null
  >();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    changeLocale(lang);
  }, []);

  const pathname = usePathname();
  async function changeLocale(cultureName: string) {
    // split based on - 
    if (cultureName.includes("-")) {
      console.log("cultureName ", cultureName);
      cultureName = cultureName.split("-")[0];
    }
    setIsLoading(true);
    let resource = await fetch('./api/?lang=' + cultureName);
    let responce = await resource.json() as Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationDto;
    if (responce) {
      setCultureName(cultureName);
      setResources(responce.resources);
      const newPath = pathname.split("/").slice(2).join("/");
      window.history.pushState(null, "", `/${cultureName}/${newPath}`);
    }
    setIsLoading(false);
  }

  return (
    <LocaleContext.Provider value={{ cultureName, changeLocale, resources }}>
      {isLoading && <Spinner size="lg" />}
      {children}
    </LocaleContext.Provider>
  );
};
