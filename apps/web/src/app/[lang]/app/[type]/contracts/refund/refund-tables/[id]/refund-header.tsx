"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/sonner";
import type {
  UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailDto,
  UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto,
} from "@ayasofyazilim/saas/ContractService";
import { $UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderUpdateDto as editSchema } from "@ayasofyazilim/saas/ContractService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ayasofyazilim-ui/atoms/alert-dialog";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import AutoForm from "@repo/ayasofyazilim-ui/organisms/auto-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBaseLink } from "src/utils";
import {
  deleteRefundTableHeaders,
  getRefundTableHeadersDetailById,
} from "../../../action";
import { RefundRules } from "./refund-rule";

export default function RefundHeader({
  languageData,
  params,
}: {
  languageData: Record<string, string>;
  params: { lang: string; id: string };
}): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSaveable, setIsSaveable] = useState(false);
  const [details, setDetails] =
    useState<UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto>();
  const [tableData, setTableData] = useState<
    | UniRefund_ContractService_Refunds_RefundTableDetails_RefundTableDetailDto[]
    | []
  >([]);
  const router = useRouter();

  useEffect(() => {
    void getRefundTableHeadersDetailById({ id: params.id }).then((response) => {
      if (response.type === "success") {
        setDetails(response.data);
        setTableData(response.data.refundTableDetails || []);
        setLoading(false);
      }
    });
  }, []);
  if (loading) {
    return <Skeleton />;
  }
  if (!details) return <div>Not Found</div>;

  function handleRefundTableHeadersDelete() {
    setLoading(true);
    void deleteRefundTableHeaders({
      id: params.id,
    }).then((response) => {
      if (response.type === "success") {
        toast.success("Refund table deleted successfully");
      } else {
        toast.error("Refund table deletion failed");
      }
    });
    setDialogOpen(false);
    router.push(getBaseLink("app/admin/contracts/refund/refund-tables"));
  }
  function handleRefundTableHeadersEdit() {
    //   // setLoading(true);
    //   return;
    //   void putRefundTableHeaders({
    //     // id: row.id,
    //     //TODO: saas güncellenince row.id silenecek
    //     requestBody: { ...data, id: row.id },
    //   }).then((response) => {
    //     if (response.status === 200 && response.data) {
    //       toast.success(response.message || "Refund table updated successfully");
    //     } else {
    //       toast.error(response.message || "Refund table update failed");
    //     }
    //     setLoading(false);
    //   });
    // i will implement this with saas update
  }
  return (
    <>
      <PageHeader
        LinkElement={Link}
        description={`${details.validFrom} - ${details.validTo}`}
        href={getBaseLink("/app/admin/contracts/refund/refund-tables")}
        title={details.name || ""}
      />
      <Card className="h-[500px] overflow-auto p-4">
        <AutoForm
          className="grid grid-cols-2 items-start gap-4 space-y-0"
          fieldConfig={{
            name: {
              containerClassName: "block",
            },
            validFrom: {
              containerClassName: "h-full bg-red-200",
              inputProps: {
                disabled: true,
                required: false,
              },
            },
          }}
          formClassName=""
          formSchema={createZodObject(editSchema, [
            "name",
            "validFrom",
            // "isDefault",
            // "isBundling",
            //those line above will be implemented with saas
          ])}
          onParsedValuesChange={() => {
            setIsSaveable(true);
          }}
          onSubmit={handleRefundTableHeadersEdit}
          values={details}
        >
          <div className="flex w-full items-center justify-end gap-4">
            <Button
              disabled={!isSaveable}
              type="submit"
              variant={isSaveable ? "default" : "secondary"}
            >
              Kaydet
            </Button>
            <AlertDialog open={dialogOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  onClick={() => {
                    setDialogOpen(true);
                  }}
                  variant="outline"
                >
                  Sil
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    <strong> {details.name} </strong>from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => {
                      setDialogOpen(false);
                    }}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleRefundTableHeadersDelete}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </AutoForm>
        <RefundRules
          data={tableData}
          languageData={languageData}
          params={params}
        />
      </Card>
    </>
  );
}
