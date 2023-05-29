export default function LayoutUser({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { user: string };
}) {
  return (
    <>
      <h4 className="text-sm text-slate-600">@{params.user}'s</h4>
      {children}
    </>
  );
}
