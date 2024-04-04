"use client";
import { CountrySelector } from "@repo/ayasofyazilim-ui/organisms/country-selector";
import { useContext, useEffect } from "react";
import { LocaleContext } from "src/providers/locale";
import countries from "./data";

export default function LanguageSelector(): JSX.Element {
  const { cultureName, resources, changeLocale } = useContext(LocaleContext);
  useEffect(() => {
    console.log(cultureName, resources);
  }, [cultureName]);
  return (
    <div>
      <CountrySelector
        searchText="Find"
        searchEmptyValue="No country found."
        defaultValue={cultureName}
        countries={countries}
        onValueChange={(value: string) => {
          changeLocale(value);
        }}
      />
      {resources?.AbpUi.texts?.Welcome}
    </div>
  );
}
