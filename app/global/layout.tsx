export default function LayoutGlobal({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto max-w-7xl p-4">{children}</div>;
}
