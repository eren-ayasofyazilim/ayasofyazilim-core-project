import Spinner from "@repo/ayasofyazilim-ui/molecules/spinner";

export default function Loading() {
  return (
    <Spinner
      className="stroke-purple-900"
      fullScreen={false}
      variant="transparent"
    />
  );
}
