import { Brands } from "components/brands";
import { Hero } from "components/hero";

export default function Page(): JSX.Element {
  return (
    <div className="w-full bg-red-200 p-0 h-[200vh]">
      <Hero />
      <Brands />
    </div>
  );
}
