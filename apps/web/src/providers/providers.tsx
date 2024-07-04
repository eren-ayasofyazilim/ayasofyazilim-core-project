"use server";

import { getLocalizationResources } from "src/utils";
import AuthSession from "./auth";
import { ConfigProvider } from "./configuration";
import { LocaleProvider } from "./locale";
import { PermissionProvider } from "./permissions";
import Toaster from "@repo/ayasofyazilim-ui/molecules/toaster";
import { ApplicationProvider } from "./application";
import Tooltip from "./tooltip";

interface IProviders {
  children: JSX.Element;
  lang: string;
}
export default async function Providers({ children, lang }: IProviders) {
  const resources = await getLocalizationResources(lang);
  if (!resources) return <></>;

  const appName = process.env?.APPLICATION_NAME || "UNIREFUND";
  return (
    <>
      <Toaster richColors />
      <ApplicationProvider appName={appName}>
        <AuthSession>
          <PermissionProvider>
            <ConfigProvider>
              <Tooltip>
                <LocaleProvider resources={resources} lang={lang}>
                  {children}
                </LocaleProvider>
              </Tooltip>
            </ConfigProvider>
          </PermissionProvider>
        </AuthSession>
      </ApplicationProvider>
    </>
  );
}
