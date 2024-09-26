import type { NavbarItemsFromDB } from "@repo/ui/theme/types";
import type { AbpUiNavigationResource } from "src/language-data/AbpUiNavigation";
import { unirefundNavbarDataFromDB } from "./projects/unirefund";
import { ayshopgoNavbarDataFromDB } from "./projects/ayshopgo";
import { tahsiletNavbarDataFromDB } from "./projects/tahsilet";

const dbData = {
  UNIREFUND: unirefundNavbarDataFromDB,
  UPWITHCROWD: unirefundNavbarDataFromDB,
  TAHSILET: tahsiletNavbarDataFromDB,
  AYSHOPGO: ayshopgoNavbarDataFromDB,
};

export function getNavbarFromDB(
  prefix: string,
  languageData: AbpUiNavigationResource,
  appName: string,
) {
  const navbarDataFromDB: NavbarItemsFromDB[] = JSON.parse(
    JSON.stringify(dbData[appName as keyof typeof dbData]),
  ) as NavbarItemsFromDB[];

  function processItems(items: NavbarItemsFromDB[]) {
    items.forEach((item) => {
      if (item.href) {
        item.href = `${prefix}/${item.href}`;
      }

      if (item.parentNavbarItemKey === "/") {
        item.parentNavbarItemKey = prefix;
      } else {
        item.parentNavbarItemKey = `${prefix}/${item.parentNavbarItemKey}`;
      }

      if (item.key && item.key !== "/") {
        item.key = `${prefix}/${item.key}`;
      } else {
        item.key = prefix;
      }

      //İleride displayname'in veritabanından çevrili gelmiş olmasını bekliyoruz.
      item.displayName =
        languageData[
          (
            item.displayName[0].toUpperCase() + item.displayName.slice(1)
          ).replaceAll(" ", "") as keyof typeof languageData
        ] || `**${item.displayName}`;
    });
  }

  processItems(navbarDataFromDB);
  return navbarDataFromDB;
}
