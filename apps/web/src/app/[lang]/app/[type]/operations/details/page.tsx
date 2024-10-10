"use client";
import type { ColumnsType } from "@repo/ayasofyazilim-ui/molecules/tables";
import DataTable from "@repo/ayasofyazilim-ui/molecules/tables";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { GetApiTagServiceTagResponse } from "@ayasofyazilim/saas/TagService";
import { $UniRefund_TagService_Tags_TagListItemDto } from "@ayasofyazilim/saas/TagService";
import { toast } from "@/components/ui/sonner";
import { getBaseLink } from "src/utils";
import type { TaxFreeTag } from "./data";
import { getTags } from "./actions";

export default function Page(): JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<GetApiTagServiceTagResponse>();
  const fetchTags = (page: number /* , filter: string */) => {
    setLoading(true);
    void getTags({ maxResultCount: 10, skipCount: page * 10 })
      .then((res) => {
        if (res.type === "success") {
          setTags(res.data);
        }
        if (res.type === "error") {
          toast.error(res.message);
        }
        if (res.type === "api-error") {
          toast.error(res.message);
        }
      })
      .finally(() => {
        setLoading(false);
        // handleFilter(filter);
      });
  };

  useEffect(() => {
    async function getTagsFromAPI() {
      const tagsList = await getTags();
      if (tagsList.type === "success") {
        setTags(tagsList.data);
        toast.success(tagsList.message);
        setLoading(false);
        return;
      }
      toast.error(tagsList.message);
    }
    void getTagsFromAPI();
  }, []);
  const columnsData: ColumnsType = {
    type: "Auto",
    data: {
      tableType: $UniRefund_TagService_Tags_TagListItemDto,
      excludeList: ["id"],
      actionList: [
        {
          cta: "Open in new page",
          type: "Action",
          callback: (originalRow: TaxFreeTag) => {
            router.push(
              getBaseLink(
                `app/admin/operations/details/${originalRow.taxFreeTagFacturaNumber}`,
              ),
            );
          },
        },
      ],
    },
  };

  return (
    <DataTable
      action={{
        type: "NewPage",
        cta: "Add Tag",
        href: getBaseLink("app/admin/operations/details/add"),
      }}
      columnsData={columnsData}
      data={tags?.items || []}
      fetchRequest={fetchTags}
      isLoading={loading}
      rowCount={tags?.totalCount || 0}
    />
  );
}
