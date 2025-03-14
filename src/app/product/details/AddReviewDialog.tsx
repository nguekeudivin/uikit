"use client";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import TextField from "@/components/common/form/TextField";
import { Dispatch, SetStateAction } from "react";
import { MdStar } from "react-icons/md";
import TextAreaField from "@/components/common/form/TextAreaField";

interface AddReviewDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  form: any;
}

export default function AddReviewDialog({
  isOpen,
  setIsOpen,
  form,
}: AddReviewDialogProps) {
  const submit = () => {
    if (form.check()) {
    } else {
    }
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(value) => {
        if (value == false) form.resetValues();
        setIsOpen(false);
      }}
    >
      <DialogContent className="min-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add new review</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <label>Your review about this product:</label>
            <div className="flex items-center gap-0.5 mt-2">
              {[1, 2, 3, 4, 5].map((item, index) => (
                <div
                  key={`star-product-${index}`}
                  onClick={() => {
                    form.setValue("stars", item);
                  }}
                >
                  {item <= form.values.stars ? (
                    <MdStar className="text-yellow-500 w-6 h-6" />
                  ) : (
                    <MdStar className="text-gray-300 w-6 h-6" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <TextAreaField
            name="content"
            onChange={form.handleChange}
            value={form.values.content}
            error={form.errors.content}
            label="Content"
          />

          <TextField
            name="name"
            onChange={form.handleChange}
            value={form.values.name}
            error={form.errors.name}
            label="Name"
          />

          <TextField
            name="email"
            onChange={form.handleChange}
            value={form.values.email}
            error={form.errors.email}
            label="Email"
          />
        </div>

        <DialogFooter>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
            variant="outline"
          >
            Cancel
          </Button>
          <Button onClick={submit} variant="dark">
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
