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
        <Button
          variant={"ghost"}
          size="icon"
          className="text-gray-100 bg-gray-600 border border-gray-200 hover:text-primary hover:bg-primary/20"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
        
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the summary?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
        <Button
          variant="ghost"
          size="icon"
          className=" bg-gray-50 border border-gray-200 hover:text-gray-600 hover:bg-gray-100"
          onClick={()=>setOpen(false)}
        >
          Cancel
          
        </Button>
        <Button
          variant="destructive"
          size="icon"
          className=" bg-gray-900 border border-gray-200 hover:bg-gray-600"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <LoadingSpinner size="sm" variant="secondary" className="border-white border-t-transparent" />
          ) : (
            'Delete'
          )}
        </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
