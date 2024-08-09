export default function Layout({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  return <div className="h-full overflow-auto">{children}</div>;
}
