import Landing from "../landing";
import { getConfig } from "../config";

export default function Page({ params }: { params: { city: string } }) {
  const appName = params.city;
  const config = getConfig(appName);
  return <Landing config={config} />;
}
