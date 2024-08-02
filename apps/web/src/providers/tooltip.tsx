"use client";

import { TooltipProvider } from "@repo/ayasofyazilim-ui/molecules/tooltip";

export default function Tooltip({
  children,
}: {
  children: JSX.Element;
}): React.ReactElement {
  return <TooltipProvider>{children}</TooltipProvider>;
}
