/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment -- TODO: we need to fix this*/
// "use server";

// import { getResourceData } from "src/language-data/Projects/projects";

export default function Page({ params }: any) {
  const { travellerId } = params;
  //   const { languageData } = await getResourceData(params.lang);

  return <div className="">id: {travellerId}</div>;
}
