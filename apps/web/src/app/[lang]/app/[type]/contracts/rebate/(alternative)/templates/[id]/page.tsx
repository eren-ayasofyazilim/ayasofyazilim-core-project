import TemplateDetails from "./template-details";

export default function Page({
  params,
}: {
  params: { lang: string; type: string; id: string };
}) {
  return <TemplateDetails templateId={params.id} />;
}
