"use server";

import { isCustomNodeSelected } from "@tiptap-location/lib/utils";
import Landing from "./landing";
import { getConfig } from "./layout";

export default async function Page() {
  const appName = process.env.APPLICATION_NAME || "konya";
  const config = await getConfig(appName);
  return <Landing config={config} />;
}
