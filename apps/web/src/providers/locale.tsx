"use client";

import type { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto } from "@ayasofyazilim/saas/AccountService";
import { createContext, useContext } from "react";
import { getBaseLink } from "src/utils";

type ResourceDto =
  Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto;

interface ILocaleProviderProps {
  resources: Record<string, ResourceDto>;
  children: JSX.Element;
  lang: string;
}
interface ILocaleContextProps {
  changeLocale?: (_cultureName: string) => void;
  resources: Record<string, ResourceDto>;
  cultureName: string | undefined;
}

export const LocaleContext = createContext<ILocaleContextProps>({
  cultureName: undefined,
  resources: {},
});

export const useLocale = () => {
  return useContext(LocaleContext);
};

export function LocaleProvider({
  children,
  lang,
  resources,
}: ILocaleProviderProps) {
  const localeData = { resources, cultureName: lang };

  function changeLocale(cultureName: string) {
    if (!cultureName) return;
    const newUrl = `${cultureName}/${location.pathname.split("/").slice(2).join("/")}`;
    location.href = getBaseLink(newUrl, false);
  }

  return (
    <LocaleContext.Provider value={{ ...localeData, changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
