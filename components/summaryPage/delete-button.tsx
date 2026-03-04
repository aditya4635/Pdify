"use client";

import { Trash2 } from "lucide-react";

import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import deleteSummary from "@/actions/summary-actions";
import { LoadingSpinner } from "../ui/loading-spinner";

interface DeleteButtonProps{
    summaryId:string;
}
export default function DeleteButton({ summaryId }: DeleteButtonProps) {
    const [open,setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete= async ()=>{
        try {
            setIsDeleting(true);
            await deleteSummary({ summaryId });
            setOpen(false);
        } finally {
            setIsDeleting(false);
        }
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/8 hover:bg-white/14 border border-white/10 text-white/75 hover:text-white text-sm font-medium transition-all w-full">
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this summary? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="ghost"
            className="bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-200"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <LoadingSpinner size="sm" variant="secondary" className="border-white border-t-transparent" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
