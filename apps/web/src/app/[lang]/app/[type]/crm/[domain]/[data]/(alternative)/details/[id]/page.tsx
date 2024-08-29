"use server";
import { UniRefund_CRMService_Merchants_MerchantDto } from "@ayasofyazilim/saas/CRMService";
import { getCRMDetailServer } from "./action";
import Form from "./form";

export default async function Page({
  params,
}: {
  params: {
    id: string;
    data: string;
  };
}) {
  const data = (await getCRMDetailServer({ id: params.id }))
    .data as UniRefund_CRMService_Merchants_MerchantDto;

  return <Form data={data} params={params} />;
}
