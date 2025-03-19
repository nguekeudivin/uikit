"use client";

import PageContent from "@/components/common/PageContent";
import { useSimpleForm } from "@/hooks/use-simple-form";
import { z } from "zod";
import "react-phone-number-input/style.css"; // Import the default styles
import { Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FormEvent } from "react";
import clsx from "clsx";
import TextField from "@/components/common/form/TextField";
import PhoneNumberField from "@/components/common/form/PhoneNumberField";
import CountryField from "@/components/common/form/CountryField";
import "./create.css";

export default function UserLayout() {
  const form = useSimpleForm({
    defaultValues: {
      picture: {
        file: undefined,
        src: undefined,
      },
      fullName: "",
      emailAddress: "",
      phoneNumber: "",
      country: "",
      stateRegion: "",
      city: "",
      address: "",
      company: "",
      role: "",
      zipCode: "",
    },
    schema: z.object({
      fullName: z.string().min(1, "Full name is required"),
      emailAddress: z.string().email("Please provide a valid email address"),
      phoneNumber: z.string().min(1, "Phone number is required"),
      country: z.string().min(1, "Please select your country"),
      stateRegion: z.string().min(1, "Please provide your state or region"),
      city: z.string().min(1, "Please provide your city"),
      address: z.string().min(1, "Please provide your address"),
      company: z.string().min(1, "Please provide your company name"),
      role: z.string().min(1, "Please provide your role"),
      zipCode: z.string().min(1, "Please provide your zip/postal code"),
    }),
  });

  const submit = () => {
    console.log(form.values);
    form
      .validateAsync()
      .then(() => {})
      .catch(() => {});
  };

  const uploadPicture = (event: FormEvent) => {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : undefined;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        form.setValue("picture", {
          file: file,
          src: e.target.result,
        });
      };
    }
  };

  return (
    <PageContent title="Create User" links={{ User: "/", "New User": "#" }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <aside className="shadow  rounded-xl flex flex-col items-center p-16">
          <div
            className={clsx(
              "input-picture-box rounded-full bg-cover flex items-center justify-center",
              {
                "p-2 border": form.values.picture.src == undefined,
                "picture-fill": form.values.picture.src != undefined,
              }
            )}
            style={{ backgroundImage: `url(${form.values.picture.src})` }}
          >
            <label
              htmlFor="fileInput"
              className="w-36 h-36 rounded-full flex items-center justify-center bg-gray-300"
            >
              <p className="flex flex-col items-center">
                <Image />
                <span className="text-sm mt-1">Upload Photo</span>
              </p>
            </label>
            <input
              type="file"
              id="fileInput"
              onChange={uploadPicture}
              className="hidden"
            />
          </div>

          <p className="mt-6 text-muted-foreground text-sm text-center">
            Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3 Mb
          </p>

          <div className="flex justify-between mt-6">
            <div>
              <p className="font-semibold">Email Verified</p>

              <p className="flex justify-between">
                <label
                  htmlFor="email-verified"
                  className="text-muted-foreground"
                >
                  Disabling this will automatically send the user a verification
                  email
                </label>
                <Switch id="email-verified" />
              </p>
            </div>
          </div>
        </aside>

        <div className="col-span-2">
          <aside className="p-8 rounded-xl shadow ">
            {form.renderErrors()}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
              <div>
                <TextField
                  name="fullName"
                  onChange={form.handleChange}
                  value={form.values.fullName}
                  label={"Full Name"}
                />
              </div>
              <div>
                <TextField
                  name="emailAddress"
                  label="Email Address"
                  onChange={form.handleChange}
                  value={form.values.emailAddress}
                />
              </div>
              <div>
                <PhoneNumberField
                  label="Phone number"
                  placeholder="Enter your number"
                  onValueChange={(value) => form.setValue("phoneNumber", value)}
                />
              </div>
              <div>
                <CountryField
                  label="Country"
                  name="country"
                  placeholder="Select your country"
                  onValueChange={(value) => form.setValue("country", value)}
                  value={form.values.country}
                />
              </div>
              <div>
                <TextField
                  name="stateRegion"
                  label="State Region"
                  onChange={form.handleChange}
                  value={form.values.stateRegion}
                />
              </div>
              <div>
                <TextField
                  name="city"
                  label="City"
                  onChange={form.handleChange}
                  value={form.values.city}
                />
              </div>
              <div>
                <TextField
                  name="address"
                  label="Address"
                  onChange={form.handleChange}
                  value={form.values.address}
                />
              </div>
              <div>
                <TextField
                  name="company"
                  label="Company"
                  onChange={form.handleChange}
                  value={form.values.company}
                />
              </div>
              <div>
                <TextField
                  name="role"
                  label="Role"
                  onChange={form.handleChange}
                  value={form.values.role}
                />
              </div>
              <div>
                <TextField
                  name="zipCode"
                  label="Zip Code"
                  onChange={form.handleChange}
                  value={form.values.zipCode}
                />
              </div>
            </div>
            <div onClick={submit} className="flex justify-end mt-8">
              <Button variant="dark"> Create user </Button>
            </div>
          </aside>
        </div>
      </div>
    </PageContent>
  );
}
