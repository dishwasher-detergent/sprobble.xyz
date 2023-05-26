export default function LayoutUser({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h4 className="text-sm text-slate-600">User</h4>
      {children}
    </>
  );
}
