export default function Layout({ children }: { children: JSX.Element }) {
  return <div className="container m-4 max-w-3xl mx-auto">{children}</div>;
}
