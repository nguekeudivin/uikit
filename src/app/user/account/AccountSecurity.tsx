import TextField from "@/components/common/form/TextField";
import { Button } from "@/components/ui/button";
import { useSimpleForm } from "@/hooks/use-simple-form";
import { z } from "zod";

export default function AccountSecurity() {
  const form = useSimpleForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    schema: z
      .object({
        oldPassword: z.string().min(1, { message: "Old password is required" }),
        newPassword: z
          .string()
          .min(8, { message: "New password must be at least 8 characters" }),
        confirmPassword: z
          .string()
          .min(1, { message: "Confirm password is required" }),
      })
      .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // Attach the error to the confirmPassword field
      }),
  });

  const submit = () => {
    if (form.check()) {
      console.log("Form submitted successfully:", form.values);
      // Add your form submission logic here (e.g., API call)
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <div className="shadow rounded-2xl p-6">
      <div>
        <TextField
          name="oldPassword"
          label="Old password"
          type="password"
          value={form.values.oldPassword}
          onChange={form.handleChange}
          canToggleType={true}
          error={form.errors.oldPassword}
        />
      </div>
      <div className="mt-4">
        <TextField
          name="newPassword"
          label="New password"
          type="password"
          value={form.values.newPassword}
          onChange={form.handleChange}
          canToggleType={true}
          error={form.errors.newPassword}
        />
      </div>
      <div className="mt-4">
        <TextField
          name="confirmPassword"
          label="Confirm password"
          type="password"
          value={form.values.confirmPassword}
          onChange={form.handleChange}
          canToggleType={true}
          error={form.errors.confirmPassword}
        />
      </div>
      <div className="mt-8 flex justify-end">
        <Button onClick={submit} variant="dark">
          Save changes
        </Button>
      </div>
    </div>
  );
}
