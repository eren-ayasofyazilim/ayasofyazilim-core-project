import Button from "@repo/ayasofyazilim-ui/molecules/button";
import Progress from "@repo/ayasofyazilim-ui/molecules/progress";
import Link from "next/link";

export const currencyFormatter = new Intl.NumberFormat("tr", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 0,
});
export const numberFormatter = new Intl.NumberFormat("tr", {
  maximumFractionDigits: 0,
});
export function getFundCollectionType(languageData: any, fundType?: string) {
  return fundType === "SHRE"
    ? languageData["FundCollectionTypeSHRE"]
    : languageData["FundCollectionTypeDBIT"];
}
export function getProjectStartDate(
  languageData: any,
  projectStartDate: string
) {
  return projectStartDate !== "0001-01-01T00:00:00"
    ? new Date(projectStartDate ?? 0)
        .toLocaleString("tr", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .split(" ,")[0]
    : languageData.StartingSoon;
}
interface IProjectCardProps {
  languageData: any;
  project: any;
  projectURL: string;
  horizontal?: boolean;
  actionText?: string;
  showProgress?: boolean;
  ProjectStatusEnums: any;
}
interface IInformationLineProps {
  label: string;
  value: string;
}
interface IStatusBadgeProps {
  status: string;
  title: string;
}
function StatusBadge({ status, title }: IStatusBadgeProps) {
  const badgeColors = {
    IN_DRAFT_STAGE: "bg-gray-300 border-gray-200",
    SENT_FOR_APPROVAL: "bg-amber-400 text-white border-amber-300",
    APPROVED: "bg-purple-500 text-white border-purple-400",
    NOT_APPROVED: "bg-red-400 text-white border-red-300",
    FUNDABLE: "bg-cyan-500 text-white border-cyan-400",
    FUNDING_SUCCESSFUL: "bg-emerald-500 text-white border-emerald-400",
    FUNDING_UNSUCCESSFUL: "bg-pink-950 text-white border-pink-800",
    FUNDING_COMPLETED: "bg-gray-300 border-gray-200",
  };
  const className = badgeColors[status as keyof typeof badgeColors];

  return (
    <div
      className={`px-2 py-1 rounded-md border-2 font-bold text-xs flex items-center justify-center ${className}`}
    >
      {title}
    </div>
  );
}
function InformationLine({ label, value }: IInformationLineProps) {
  return (
    <div className="items-center py-1 flex justify-between text-center flex-row">
      <div className="text-xs flex gap-0 font-semibold">{label}</div>
      <div className="text-xs flex gap-0">{value}</div>
    </div>
  );
}
export default function ProjectCard({
  languageData,
  project,
  projectURL,
  horizontal = false,
  actionText,
  showProgress,
  ProjectStatusEnums,
}: IProjectCardProps): JSX.Element {
  const fundCollectionType = getFundCollectionType(
    languageData,
    project.fundCollectionType
  );
  const projectStartDate = getProjectStartDate(
    languageData,
    project.projectStartDate
  );
  const projectStatus = ProjectStatusEnums[project.status || 0];
  return (
    <div
      key={project.id}
      className={`bg-white border rounded-md flex ${horizontal ? "flex-row" : "flex-col basis-1/3"}`}
    >
      <div className={horizontal ? "basis-2/4 relative" : "relative"}>
        <img
          src="https://placehold.co/1920x600"
          className={`h-full object-cover min-h-[200px] ${horizontal ? "" : "rounded-t-md"}`}
        />
        <div className="absolute top-3 right-3">
          <StatusBadge
            title={languageData[projectStatus]}
            status={projectStatus}
          />
        </div>
      </div>
      <div className={horizontal ? "basis-2/4" : ""}>
        {showProgress && (
          <Progress
            value={Math.max(
              5,
              ((project.fundNominalAmount || 0) /
                (project.fundableAmount || 1)) *
                100
            )}
            containerClassName="h-4 overflow-hidden m-0"
            className={`bg-[#05ce78] rounded-r-full flex items-center`}
          >
            <div className="ml-auto w-3 h-3 rounded-full bg-[#08995a] text-[#08995a] mr-1 flex items-center justify-center"></div>
          </Progress>
        )}
        <div className="py-4 px-6 flex flex-col gap-2 border-b">
          <h3 className="font-semibold leading-none tracking-tight hover:underline">
            <Link href={projectURL}>{project.projectName}</Link>
          </h3>
          <p className="text-sm text-muted-foreground">
            {project.projectDefinition}
          </p>
        </div>

        <div className="py-4 px-6 flex flex-col gap-2">
          <InformationLine
            label={languageData.FundCollectionType}
            value={fundCollectionType}
          />
          <InformationLine
            label={languageData.AdditionalFunding}
            value={`%${project.additionalFundRate || 0}`}
          />
          <InformationLine
            label={languageData.CampaignStartDate}
            value={projectStartDate}
          />
        </div>
        <div>
          <div className="flex flex-row justify-between items-center bg-gray-100">
            <div className="p-6 flex justify-between py-2 text-center flex-col items-start">
              <div className="flex gap-0 font-semibold text-md m-auto">
                {currencyFormatter.format(project.fundNominalAmount ?? 0)}
              </div>
              <div className="text-xs flex gap-0">
                {languageData.CollectedAmount}
              </div>
            </div>
            <div className="p-6 flex justify-between py-2 text-center flex-col items-end">
              <div className="flex gap-0 font-semibold text-md m-auto">
                {currencyFormatter.format(project.fundableAmount ?? 0)}
              </div>
              <div className="text-xs flex gap-0">
                {languageData.TargetAmount}
              </div>
            </div>
          </div>
        </div>
        {actionText && (
          <div className="px-4 py-3">
            <Button
              asChild
              customVariant="primary"
              className="rounded-full w-full"
            >
              <Link href={projectURL}>{actionText}</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
