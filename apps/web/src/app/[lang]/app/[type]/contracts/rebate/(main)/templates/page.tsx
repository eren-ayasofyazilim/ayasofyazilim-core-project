import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Rebates() {
  return (
    <div>
      <h1>Template List</h1>
      <Button asChild>
        <Link href="templates/new-rebate-template">Create Template</Link>
      </Button>
    </div>
  );
}
