"use client";

import { useSimpleForm } from "@/hooks/use-simple-form";
import { z } from "zod";
import { Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FormEvent, useEffect } from "react";
import TextField from "@/components/common/form/TextField";
import PhoneNumberField from "@/components/common/form/PhoneNumberField";
import CountryField from "@/components/common/form/CountryField";
import "./account.css";
import { cn } from "@/lib/utils";
import TextAreaField from "@/components/common/form/TextAreaField";

export default function AccountGeneral() {
  const form = useSimpleForm({
    defaultValues: {
      picture: {
        file: undefined,
        dataUrl: undefined,
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
      about: "",
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

  useEffect(() => {
    form.setValues((values: any) => ({
      ...values,
      picture: {
        file: undefined,
        dataUrl: "/assets/images/avatar/avatar-1.webp",
      },
      fullName: "Afrika Kemi",
      emailAddress: "afrikakemi@example.com",
      phoneNumber: "+237681037278",
      country: "Cameroon",
      stateRegion: "Littoral",
      city: "Douala",
      address: "123 Main St",
      company: "Acme Inc.",
      role: "Software Engineer",
      zipCode: "90001",
      about:
        "Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..",
    }));
  }, []);

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
        console.log(e.target.result);
        form.setValue("picture", {
          file: file,
          dataUrl: e.target.result,
        });
      };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      <aside className="shadow  rounded-xl p-16 relative">
        <div className="flex flex-col items-center">
          <div
            className={cn(
              "input-picture-box rounded-full bg-cover flex items-center justify-center",
              {
                "p-2 border": form.values.picture.dataUrl == undefined,
                "picture-fill": form.values.picture.dataUrl != undefined,
              }
            )}
            style={{ backgroundImage: `url(${form.values.picture.dataUrl})` }}
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
        </div>

        <p className="mt-6 text-muted-foreground text-sm text-center">
          Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3 Mb
        </p>

        <div className="flex items-center justify-between mt-6">
          <div>
            <label htmlFor="public-profile" className="text-muted-foreground">
              Public profile
            </label>
          </div>
          <div>
            <Switch id="public-profile" />
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button variant="lightRed"> Delete Account </Button>
        </div>
      </aside>

      <div className="col-span-2">
        <aside className="p-8 rounded-xl shadow ">
          {form.renderErrors()}
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
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
                defaultCountry={form.values.country}
                value={form.values.phoneNumber}
                onValueChange={(value) => form.setValue("phoneNumber", value)}
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
                label="State/Region"
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
                name="zipCode"
                label="Zip Code"
                onChange={form.handleChange}
                value={form.values.zipCode}
              />
            </div>
            <div className="col-span-2">
              <TextAreaField
                name="about"
                label="About"
                onChange={form.handleChange}
                value={form.values.about}
              />
            </div>
          </div>
          <div onClick={submit} className="flex justify-end mt-8">
            <Button variant="dark"> Save changes </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
