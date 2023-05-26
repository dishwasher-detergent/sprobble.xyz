export default function LayoutGlobal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h4 className="text-sm text-slate-600">Global</h4>
      {children}
    </>
  );
}
