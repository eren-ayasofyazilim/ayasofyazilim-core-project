import { cn } from "../../utils";
import { Logo } from "../../logo";

export default function AppLogo({
  appName,
  textClassName,
  logoClassName,
}: {
  appName: string;
  textClassName?: string;
  logoClassName?: string;
}): JSX.Element {
  if (appName != "UNIREFUND") {
    return (
      <span className={cn("tracking-widest text-2xl font-bold", textClassName)}>
        {appName.toLocaleUpperCase()}
      </span>
    );
  }

  return (
    <Logo
      variant="text"
      iconProps={{
        className: cn("w-10 h-10", logoClassName),
        taxFree: false,
        fill: "#DB0000",
      }}
      textProps={{
        className: cn("h-4", logoClassName),
        primaryColor: "#DB0000",
      }}
      appIconProps={{
        className: cn("w-10 h-10", logoClassName),
      }}
    />
  );
}
