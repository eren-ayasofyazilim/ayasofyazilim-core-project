interface LayoutProps {
  params: { lang: string; type: string };
  admin: JSX.Element;
  entrepreneur: JSX.Element;
  investor: JSX.Element;
}

export default function Layout({
  admin,
  entrepreneur,
  investor,
  params,
}: LayoutProps) {
  const { type } = params;

  if (type === "admin") {
    return <>{admin}</>;
  }
  if (type === "entrepreneur") {
    return <>{entrepreneur}</>;
  }
  if (type === "investor") {
    return <>{investor}</>;
  }

  return <></>;
}
