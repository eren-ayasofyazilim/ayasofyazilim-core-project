"use client";

import type { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto } from "@ayasofyazilim/saas/AccountService";
import { createContext, useContext } from "react";
import type { resourceResult } from "src/utils";
import { getBaseLink } from "src/utils";

type ResourceDto =
  Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto;
type ResourcesProps = Record<string, ResourceDto> | resourceResult;
interface ILocaleProviderProps {
  resources: ResourcesProps;
  children: JSX.Element;
  lang: string;
}
interface ILocaleContextProps {
  changeLocale?: (_cultureName: string) => void;
  resources: ResourcesProps;
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
  function changeLocale(cultureName: string) {
    if (!cultureName) return;
    const newUrl = `${cultureName}/${location.pathname.split("/").slice(2).join("/")}`;
    location.href = getBaseLink(newUrl, false);
  }
  const providerValue = { resources, cultureName: lang, changeLocale };
  return (
    <LocaleContext.Provider value={providerValue}>
      {children}
    </LocaleContext.Provider>
  );
}
