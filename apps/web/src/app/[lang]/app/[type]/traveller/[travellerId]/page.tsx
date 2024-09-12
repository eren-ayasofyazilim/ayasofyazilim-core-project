"use server";

// import { getResourceData } from "src/language-data/TravellerService";
// import Form from "./form";

export default function Page({
  params,
}: {
  params: { travellerId: string; lang: string };
}) {
  // const { travellerId } = params;
  // const { languageData } = await getResourceData(params.lang);
  // return <Form languageData={languageData} travellerId={travellerId} />;
  return (
    <div>
      Traveller Page to be implemented {`${params.lang} ${params.travellerId}`}
    </div>
  );
}
