import { Inter } from "next/font/google";
import { getLocalizationResources } from "src/utils";
import "./globals.css";
export const inter = Inter({ subsets: ["latin"] });

interface IRootLayoutProps {
  params: { lang: string };
  children: JSX.Element;
}

export default async function RootLayout({
  children,
  params,
}: IRootLayoutProps) {
  const resources = await getLocalizationResources(params.lang);
  if (!resources) return <></>;

  return (
    <html>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
