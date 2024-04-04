"use client";

import Spinner from "@repo/ayasofyazilim-ui/molecules/spinner";
import {
  Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationDto,
  Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto,
} from "ayasofyazilim-saas/AccountService";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface ILocaleContext {
  cultureName: string | undefined;
  changeLocale: (cultureName: string) => void;
  resources:
    | Record<
        string,
        Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto
      >
    | null
    | undefined;
}

export const LocaleContext = createContext<ILocaleContext>({
  cultureName: undefined,
  changeLocale: () => {},
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
  const [cultureName, setCultureName] =
    useState<ILocaleContext["cultureName"]>(lang);
  const [resources, setResources] = useState<ILocaleContext["resources"]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const localeFromLocalStorage = localStorage.getItem("locale");
    if (localeFromLocalStorage) {
      const locale = JSON.parse(localeFromLocalStorage);
      setCultureName(locale.cultureName);
      setResources(locale.resources);
      return;
    }
    changeLocale(lang);
  }, []);

  async function getLocale(cultureName: string) {
    try {
      const response = await fetch(`/api/?lang=${cultureName}`);
      const data =
        (await response.json()) as Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationDto;
      if (data) {
        setCultureName(cultureName);
        setResources(data.resources);
        localStorage.setItem(
          "locale",
          JSON.stringify({
            cultureName,
            resources: data.resources,
            version: 0.1,
          })
        );
        return true;
      }
      // later: if error then try getting default language
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  async function changeLocale(cultureName: string) {
    if (cultureName) {
      setIsLoading(true);
      if (await getLocale(cultureName)) {
        const newPath = pathname.split("/").slice(2).join("/");
        window.history.pushState(null, "", `/${cultureName}/${newPath}`);
      }
      setIsLoading(false);
    }
  }

  return (
    <LocaleContext.Provider value={{ cultureName, changeLocale, resources }}>
      {isLoading && <Spinner size="lg" />}
      {children}
    </LocaleContext.Provider>
  );
};
