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

      const desc =
        `${item.displayName}.Description` in languageData
          ? languageData[
              `${item.displayName}.Description` as keyof typeof languageData
            ]
          : "No description";

      //İleride displayname'in veritabanından çevrili gelmiş olmasını bekliyoruz.
      item.displayName =
        languageData[item.displayName as keyof typeof languageData] ||
        `**${item.displayName}`;

      item.description = desc || `**${item.description}`;
    });
  }

  processItems(navbarDataFromDB);
  return navbarDataFromDB;
}
