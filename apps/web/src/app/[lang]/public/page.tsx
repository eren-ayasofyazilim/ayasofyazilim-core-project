"use server";

import Landing from "./landing";
const config = {
  bursa: {
    key: "bursa",
    with: "Bursa ile",
    its: "Bursa'nın",
    logo: "BURSA",
    colors: {
      primary: "",
      secondary: "",
    },
    images: {
      hero: "",
      second: "",
      footer: "",
    },
  },
  konya: {
    key: "konya",
    with: "Konya ile",
    its: "Konya'nın",
    logo: "KONYA",
    colors: {
      primary: "",
      secondary: "",
    },
    images: {
      hero: "",
      second: "",
      footer: "",
    },
  },
  iso: {
    key: "iso",
    with: "ISO ile",
    its: "İstabul'un",
    logo: "ISO",
    colors: {
      primary: "",
      secondary: "",
    },
    images: {
      hero: "",
      second: "",
      footer: "",
    },
  },
  sakarya: {
    key: "sakarya",
    with: "Sakarya ile",
    its: "Sakarya'nın",
    logo: "SAKARYA",
    colors: {
      primary: "",
      secondary: "",
    },
    images: {
      hero: "",
      second: "",
      footer: "",
    },
  },
};

export default async function Page() {
  let appName = process.env?.APPLICATION_NAME || "konya";

  return <Landing config={config[appName as keyof typeof config]} />;
}
