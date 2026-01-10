import { getSummaryById } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import BgGradient from "@/components/ui/home/bg-gradient";
import CardStack from "@/components/summaryPage/CardStack";
import Card1 from "@/components/summaryPage/Card1";
import Card2 from "@/components/summaryPage/Card2";
import Card3 from "@/components/summaryPage/Card3";
import Card4 from "@/components/summaryPage/Card4";

export default async function SummaryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return redirect("/sign-in");
  }

  const { id } = await params;
  const summary = await getSummaryById(id, userId);

  if (!summary) {
    return redirect("/dashboard");
  }

  return (
    <>
      <BgGradient />
      <CardStack summary={summary}>
        <Card1 summary={summary} />
        <Card2 summary={summary} />
        <Card3 summary={summary} />
        <Card4 summary={summary} />
      </CardStack>
    </>
  );
}
