"use client";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import type {
  UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderCreateDto,
  UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto,
  Volo_Abp_Application_Dtos_PagedResultDto_115,
} from "@ayasofyazilim/saas/ContractService";
import {
  $UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto as listSchema,
  $UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderCreateDto as postSchema,
} from "@ayasofyazilim/saas/ContractService";
import type {
  ColumnsType,
  TableAction,
} from "@repo/ayasofyazilim-ui/molecules/tables";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getResourceData } from "src/language-data/ContractService";
import { createZodObject, getBaseLink } from "src/utils";
import { getRefundTableHeaders, postRefundTableHeaders } from "../../action";

export default function Page({ params }: { params: { lang: string } }) {
  const [list, setList] =
    useState<Volo_Abp_Application_Dtos_PagedResultDto_115>();
  const [resources, setResources] = useState<Record<string, string>>();
  const includeList = [
    "name",
    "validFrom",
    "validTo",
    "isDefault",
    "isBundling",
  ];
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    void getRefundTableHeaders({})
      .then((response) => {
        if (response.type === "success") {
          setList(response.data);
        } else {
          toast.error(response.message);
        }
      })
      .then(async () => {
        const { languageData } = await getResourceData(params.lang);
        setResources(languageData);
        setLoading(false);
      });
  }, []);
  if (loading || !resources) return <Loading />;

  const action: TableAction = {
    cta: resources["RefundTables.Create.Title"],
    type: "Dialog",
    autoFormArgs: {
      formSchema: createZodObject(postSchema, includeList),
      submit: {
        cta: resources["RefundTables.Create.Title"],
      },
    },
    componentType: "Autoform",
    description: resources["RefundTables.Create.Description"],
    callback: (
      data: UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderCreateDto,
    ) => {
      void postRefundTableHeaders({
        requestBody: data,
      }).then((response) => {
        setLoading(true);
        if (response.type === "success") {
          toast.success(
            response.message || "Refund table created successfully",
          );
          void getRefundTableHeaders({}).then((getResponse) => {
            if (getResponse.type === "success") {
              toast.success(
                getResponse.message || "Refund table created successfully",
              );
            } else {
              toast.error(getResponse.message);
            }
            setLoading(false);
          });
        } else {
          toast.error(response.message || "Refund table creation failed");
        }
      });
    },
  };
  const tableActions: TableAction[] = [
    {
      type: "Action",
      cta: resources["RefundTables.Details"],
      callback: (
        row: UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderDto,
      ) => {
        router.push(
          getBaseLink(`app/admin/contracts/refund/refund-tables/${row.id}`),
        );
      },
    },
  ];
  const columnsData: ColumnsType = {
    type: "Auto",
    data: {
      tableType: listSchema,
      excludeList: [],
      positions: includeList.concat("lastModifierId", "lastModificationTime"),
      actionList: tableActions,
    },
  };
  return (
    <div className="h-full">
      <Card className="h-full px-4">
        <DataTable
          action={action}
          columnsData={columnsData}
          data={list?.items || []}
          isLoading={loading}
        />
      </Card>
    </div>
  );
}

function Loading() {
  return (
    <div className="h-full">
      <Card className="h-full px-4">
        <DataTable
          columnsData={{
            type: "Auto",
            data: {
              tableType: listSchema,
              excludeList: [],
              positions: [],
              actionList: [],
            },
          }}
          data={[]}
          isLoading
        />
      </Card>
    </div>
  );
}
