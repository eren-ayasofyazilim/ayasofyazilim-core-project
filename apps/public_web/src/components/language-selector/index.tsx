"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ayasofyazilim-ui/atoms/tooltip";
import { CountrySelector } from "@repo/ayasofyazilim-ui/organisms/country-selector";
import { useContext, useEffect } from "react";
import { LocaleContext } from "src/providers/locale";
import countries from "./data";

import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@repo/ayasofyazilim-ui/atoms/command";
export default function LanguageSelector({
  menuAlign,
}: {
  menuAlign?: "start" | "center" | "end";
}): JSX.Element {
  const { cultureName, resources, changeLocale } = useContext(LocaleContext);
  useEffect(() => {}, [cultureName]);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex">
          <CountrySelector
            searchText={resources?.AbpUi.texts?.Search}
            searchEmptyValue={
              resources?.AbpExceptionHandling?.texts?.DefaultErrorMessage404
            }
            menuAlign={menuAlign}
            defaultValue={cultureName}
            countries={countries}
            onValueChange={(value: string) => {
              if (value === cultureName) return;
              changeLocale(value);
            }}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>{resources?.AbpUi?.texts?.Language}</TooltipContent>
    </Tooltip>
  );
}
