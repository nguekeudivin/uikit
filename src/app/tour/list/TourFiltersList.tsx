import {
  benefits,
  employmentTypes,
  experiences,
  locations,
  roles,
  skills,
} from "@/api-call/endpoints/jobs";
import { services } from "@/api-call/endpoints/tours";
import { users } from "@/api-call/mocks/users";
import CheckboxesField from "@/components/common/form/CheckboxesField";
import { ChipsField } from "@/components/common/form/ChipsField";
import TextField from "@/components/common/form/TextField";
import UserAvatar from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CheckBoxOption } from "@/types/form";
import { format } from "date-fns";
import { ListFilter, RotateCcw, X } from "lucide-react";

export default function TourFilterSheets({ form }: { form: any }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="transparent" className="text-base">
          Filters
          <ListFilter />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="relative px-6 py-4 w-full border-b">
          <span className="text-xl font-semibold">Filters</span>
          <div className="absolute top-3 right-12">
            <button
              onClick={() => {
                form.resetValues();
              }}
              className=" hover:bg-gray-100 transition-all duration-300 rounded-full p-2"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-6 h-screen overflow-auto px-6 pb-24 pt-6 scrollbar-thin scrollbar-thumb-gray-primary scrollbar-track-gray-200">
          <div>
            <Label>Duration</Label>
            <div className="space-y-4 mt-6">
              <TextField
                label="Start Date"
                type="date"
                placeholder=""
                className="w-full"
                name="startDate"
                value={
                  form.values.startDate &&
                  format(form.values.startDate, "MM/dd/yyyy")
                }
                onChange={({ target }: any) =>
                  form.setValue("startDate", new Date(target.value))
                }
              />
              <TextField
                type="date"
                label="End date"
                className="w-full"
                name="endDate"
                placeholder=""
                value={
                  form.values.startDate &&
                  format(form.values.startDate, "MM/dd/yyyy")
                }
                onChange={({ target }: any) =>
                  form.setValue("endDate", new Date(target.value))
                }
              />
            </div>
          </div>

          <div>
            <Label className="mb-3">Destinations</Label>
            <ChipsField
              name="destinations"
              values={form.values.destinations}
              suggestions={locations}
              searchPredicate={(item: any, keyword: string) => {
                return item.name
                  .toLowerCase()
                  .includes(keyword.toLocaleLowerCase());
              }}
              shouldPickSuggestion={true}
              renderChip={(item: any, remove: any) => {
                return (
                  <div className="rounded-xl p-0.5 px-2  flex no-wrap items-center gap-2 bg-gray-100">
                    <div className="p-1 cursor-pointer rounded-lg bg-gray flex items-center gap-2 hover:bg-gray-100">
                      <div
                        className="shrink-0 w-4 h-4 bg-gray-200 bg-cover bg-center rounded-full"
                        style={{
                          backgroundImage: `url(https://flagcdn.com/w80/${item?.ab}.png)`,
                        }}
                      ></div>
                      <div className="flex item-center gap-2">
                        <p className="font-semibold text-sm">{item.name}</p>
                        {/* <p className="text-sm uppercase text-muted-foreground">
                          {item.ab}({item.code})
                        </p> */}
                      </div>
                    </div>
                    <button
                      onClick={remove}
                      className="bg-gray-500 p-0.5 rounded-full text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                );
              }}
              renderSuggestion={(item: any, pick: any) => {
                return (
                  <div
                    onClick={pick}
                    className="flex  items-center gap-2 py-1 px-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                  >
                    <div
                      className="shrink-0 w-4 h-4 bg-gray-200 bg-cover bg-center rounded-full"
                      style={{
                        backgroundImage: `url(https://flagcdn.com/w80/${item?.ab}.png)`,
                      }}
                    ></div>
                    <div className="flex item-center gap-2">
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-sm uppercase text-muted-foreground">
                        {item.ab}({item.code})
                      </p>
                    </div>
                  </div>
                );
              }}
              placeholder="+1 Destination"
              onValuesChange={(values: (string | number)[]) => {
                form.setValue("destinations", values);
              }}
            />
          </div>

          <div>
            <Label>Tour guides</Label>
            <ChipsField
              name="guides"
              values={form.values.guides}
              suggestions={users.map((item: any) => ({
                name: item.name,
                avatar: item.avatar,
              }))}
              searchPredicate={(item: any, keyword: string) => {
                return item.name
                  .toLowerCase()
                  .includes(keyword.toLocaleLowerCase());
              }}
              shouldPickSuggestion={true}
              renderChip={(item: any, remove: any) => {
                return (
                  <div className="rounded-xl p-0.5 px-2  flex no-wrap items-center gap-2 bg-gray-100">
                    <div className="p-2 cursor-pointer rounded-lg bg-gray flex items-center gap-2 hover:bg-gray-100">
                      <UserAvatar
                        avatar={item.avatar}
                        name={item.name}
                        className="w-6 h-6"
                      />
                      <span className="truncate"> {item.name}</span>
                    </div>
                    <button
                      onClick={remove}
                      className="bg-gray-500 p-0.5 rounded-full text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                );
              }}
              renderSuggestion={(item: any, pick: any) => {
                return (
                  <div
                    onClick={pick}
                    className="p-2 cursor-pointer rounded-lg bg-gray flex items-center gap-2 hover:bg-gray-100"
                  >
                    <UserAvatar
                      avatar={item.avatar}
                      name={item.name}
                      className="w-6 h-6"
                    />
                    <span> {item.name}</span>
                  </div>
                );
              }}
              placeholder="+1 Tour guides"
              onValuesChange={(values: (string | number)[]) => {
                form.setValue("guides", values);
              }}
            />
          </div>

          <CheckboxesField
            label="Services"
            options={services.map((item) => ({ label: item, value: item }))}
            values={form.values.services}
            className=""
            onCheckedChange={(item: CheckBoxOption, checked: boolean) => {
              form.pushToggle("services", item.value, checked as boolean);
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
