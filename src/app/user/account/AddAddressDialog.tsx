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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PhoneNumberField from "@/components/common/form/PhoneNumberField";
import CountryField from "@/components/common/form/CountryField";

export default function AddAddressDialog() {
  const { addAddressDialog } = useAccount();
  const form = useSimpleForm({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      address: "",
      townCity: "",
      state: "",
      zipCode: "",
      country: "",
      type: "home",
    },
    schema: z.object({
      fullName: z.string().min(1, { message: "Full name is required" }),
      phoneNumber: z
        .string()
        .min(10, { message: "Phone number must be at least 10 digits" }),
      address: z.string().min(1, { message: "Address is required" }),
      townCity: z.string().min(1, { message: "Town/City is required" }),
      state: z.string().min(1, { message: "State is required" }),
      zipCode: z.string().min(1, { message: "Zip/Code is required" }),
      country: z.string().min(1, { message: "Country is required" }),
    }),
  });

  const submit = () => {
    form
      .validateAsync()
      .then(() => {})
      .catch(() => {});
  };

  return (
    <Dialog
      open={addAddressDialog.isOpen}
      onOpenChange={(value) => {
        if (value == false) form.resetValues();
        addAddressDialog.close();
      }}
    >
      <DialogContent className="min-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add new address</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 grid-cols-2 gap-x-4 gap-y-6 mt-4">
          <div className="col-span-2">
            <RadioGroup
              defaultValue={form.values.type}
              className="flex items-center gap-4"
              value={form.values.type}
              onValueChange={(value) => form.setValue("type", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="home" id="r1" />
                <label htmlFor="r1">Home</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="office" id="r2" />
                <label htmlFor="r2">Office</label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <TextField
              name="fullName"
              label="Full name"
              value={form.values.fullName}
              onChange={form.handleChange}
              error={form.errors.fullName}
            />
          </div>

          <div>
            <PhoneNumberField
              label="Phone number"
              placeholder="Enter your number"
              onValueChange={(value) => form.setValue("phoneNumber", value)}
              error={form.errors.phoneNumber}
            />
          </div>

          <div className="col-span-2">
            <TextField
              name="address"
              label="Address"
              value={form.values.address}
              onChange={form.handleChange}
              error={form.errors.address}
            />
          </div>

          <div>
            <TextField
              name="townCity"
              label="Town/City"
              value={form.values.townCity}
              onChange={form.handleChange}
              error={form.errors.townCity}
            />
          </div>

          <div>
            <TextField
              name="state"
              label="State"
              value={form.values.state}
              onChange={form.handleChange}
              error={form.errors.state}
            />
          </div>

          <div>
            <TextField
              name="zipCode"
              label="Zip/Code"
              value={form.values.zipCode}
              onChange={form.handleChange}
              error={form.errors.zipCode}
            />
          </div>

          <div>
            <CountryField
              label="Country"
              name="country"
              placeholder="Select your country"
              onValueChange={(value) => form.setValue("country", value)}
              value={form.values.country}
              error={form.errors.country}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-6">
          <Checkbox
            id="use-as-default"
            checked={form.values.defaultAddress}
            onCheckedChange={(value) => form.setValue("defaultAddress", value)}
          />
          <label htmlFor="use-as-default"> Use this address as default</label>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              addAddressDialog.close();
            }}
            variant="outline"
          >
            Cancel
          </Button>
          <Button onClick={submit} variant="dark">
            Deliver to this address
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
