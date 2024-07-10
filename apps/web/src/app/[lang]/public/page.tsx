import Landing from "./landing";
import { getConfig } from "./config";

export default function Page() {
  const appName = process.env.APPLICATION_NAME || "konya";
  const config = getConfig(appName);
  return <Landing config={config} />;
}
