import Link from "next/link";
import { Card } from "../ui/card";
import DeleteButton from "./delete-button";
import { FileText } from "lucide-react";
import { cn, formatFileName } from "@/lib/utils";
import { formatDistanceToNow} from 'date-fns';
import { formatFileNameAsTitle } from "@/utils/format-utils";
const SummaryHeader = ({
  fileUrl,
  title,
  createdAt,
}: {
  fileUrl: string;
  title: string | null;
  createdAt: string;
}) => {
  return (
    <div className="flex item-start gap-2 sm:gap-4">
      <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-primary mt-1" />
      <div className="flex-1 min-w-0">
        <h3 className="text-base xl:text-lg font-semibold text-gray-200 truncatew-4/5">
          {title || formatFileName(fileUrl)};
        </h3>
        <p className="text-sm text-gray-300">{formatDistanceToNow(new Date(createdAt),{addSuffix:true})}</p>
      </div>
    </div>
  );
};
const StatusBadge=({status}:{status:string})=>{
    return <span className={cn('px-3 py-1 text-xs font-medium rounded-full capitalise',status==='completed'?'bg-green-300 text-green-800':'bg-yellow-100 text-yeelow-800')}>{status}</span>
}
export default function SummaryCard({ summary }: { summary: any }) {
  return (
    <div>
      <Card className="relative h-full">
        <div className="absolute top-2 right-2">
          <DeleteButton summaryId={summary.id} />
        </div >
        <Link href={`summaries/${summary.id}`} className="block p-4 sm:p-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          <SummaryHeader
            fileUrl={summary.original_file_url}
            title={summary.title}
            createdAt={summary.created_at}
          />
          <p className="text-gray-300 line-clamp-2 text-sm sm:text-base pl-2">
            {summary.summary_text}
          </p>
          <div className="flex justify-between item-center mt-2 sm:mt-4">
            <StatusBadge status={summary.status}/>
          </div>
          </div>
        </Link>
      </Card>
    </div>
  );
}
