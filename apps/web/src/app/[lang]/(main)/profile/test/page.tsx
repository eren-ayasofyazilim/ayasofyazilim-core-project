export default async function Page() {
  let x = 0;
  //for delay
  while (x < 1000000000) {
    x++;
  }
  return <div className="grid gap-6">test</div>;
}
