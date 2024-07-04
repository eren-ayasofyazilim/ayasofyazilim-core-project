"use client";
import { toast } from "@/components/ui/sonner";
import CustomButton from "@repo/ayasofyazilim-ui/molecules/button";
import { useState } from "react";
import { ProjectStatusEnums } from "src/enums/project";
import { updateProjectStatusServer } from "../action";

export interface INewProjectFormProps {
  projectId: string;
  actionText: string;
}
export default function StatusForm({
  projectId,
  actionText,
}: INewProjectFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function onSendToApprovalClick() {
    setIsLoading(true);
    try {
      const result = await updateProjectStatusServer(
        projectId,
        ProjectStatusEnums.SENT_FOR_APPROVAL
      );

      if (result.status === 200) {
        toast.success("Başarılı.");
      } else {
        toast.error(result?.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CustomButton
      variant="default"
      className="w-full bg-transparent text-primary mt-3 border-primary border hover:bg-primary hover:text-white"
      disabled={isLoading}
      onClick={onSendToApprovalClick}
    >
      {actionText}
    </CustomButton>
  );
}
