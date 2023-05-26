import { History } from "@/components/history";

export default function HistoryPage({ params }: { params: { user: string } }) {
  const { user } = params;

  return <History user={user} />;
}
