import { RedirectType, permanentRedirect } from "next/navigation";
import { getBaseLink } from "src/utils";

export default function Page() {
  permanentRedirect(getBaseLink("country-settings/home"), RedirectType.push);
}
