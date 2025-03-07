"use client";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useAccount } from "./AccountContext";
import { useSimpleForm } from "@/hooks/use-simple-form";
import { z } from "zod";
import TextField from "@/components/common/form/TextField";
import { Lock } from "lucide-react";

export default function AddCardDialog() {
  const { addPaymentMethodDialog } = useAccount();
  const form = useSimpleForm({
    defaultValues: {
      cardNumber: "",
      cardHolder: "",
      expirationDate: "",
      Cvv: "",
      billingAddress: "",
      postalCode: "",
      country: "",
    },
    schema: z.object({
      cardNumber: z
        .string()
        .min(16, "Card number must be 16 digits")
        .max(16, "Card number must be 16 digits")
        .regex(/^\d+$/, "Card number must only contain digits"),
      cardHolder: z.string().min(3, "Cardholder name is required"),
      expirationDate: z
        .string()
        .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiration date (MM/YY)"),
      Cvv: z
        .string()
        .min(3, "CVV must be 3 digits")
        .max(4, "CVV must be 3 or 4 digits"),
    }),
  });

  const submit = () => {
    form
      .validateAsync()
      .then((validData: any) => {
        // If the id is set that means we are trying to update the item.
      })
      .catch(() => {});
  };

  return (
    <Dialog
      open={addPaymentMethodDialog.isOpen}
      onOpenChange={(value) => {
        if (value == false) form.resetValues();
        addPaymentMethodDialog.close();
      }}
    >
      <DialogContent className="min-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add new card</DialogTitle>
        </DialogHeader>
        {form.renderErrors()}
        <div className="grid gap-y-6  gap-x-4 grid-cols-2 mt-4 ">
          <div className="col-span-2">
            <TextField
              name="cardNumber"
              label="Card Number"
              placeholder="XXXX XXXX XXXX XXXX"
              value={form.values.cardNumber}
              onChange={form.handleChange}
            />
          </div>

          <div className="col-span-2">
            <TextField
              name="cardHolder"
              placeholder="Afrika Kemi"
              label="Card Holder"
              value={form.values.cardHolder}
              onChange={form.handleChange}
            />
          </div>

          <div>
            <TextField
              name="expirationDate"
              placeholder="MM/YY"
              label="Expiration Date"
              value={form.values.expirationDate}
              onChange={form.handleChange}
            />
          </div>

          <div>
            <TextField
              name="Cvv"
              placeholder="CVV"
              label="Cvv/Cvc"
              type="password"
              value={form.values.Cvv}
              onChange={form.handleChange}
              canToggleType={true}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Lock className="w-4 h-4" />
          <p>Your transaction is secured with SSL encryption</p>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              addPaymentMethodDialog.close();
            }}
            variant="outline"
          >
            Cancel
          </Button>
          <Button onClick={submit} variant="dark">
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
