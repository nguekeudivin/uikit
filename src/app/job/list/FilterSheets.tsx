import {
  benefits,
  employmentTypes,
  experiences,
  locations,
  roles,
} from "@/api-call/endpoints/jobs";
import CheckboxesField from "@/components/common/form/CheckboxesField";
import { ChipsField } from "@/components/common/form/ChipsField";
import RadiosField from "@/components/common/form/RadiosField";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CheckBoxOption } from "@/types/form";
import { ListFilter, RotateCcw, X } from "lucide-react";

export default function FilterSheets({ form }: { form: any }) {
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
          <CheckboxesField
            className=""
            name="employmentType"
            label="Employement Types"
            options={employmentTypes.map((item) => ({
              value: item,
              label: item,
            }))}
            values={form.values.employmentType}
            onCheckedChange={(
              item: CheckBoxOption,
              checked: boolean | string
            ) => {
              form.pushToggle("employmentType", item.value, checked as boolean);
            }}
          />

          <div>
            <RadiosField
              name="experience"
              label="Experience"
              className="space-y-1"
              options={experiences.map((item) => ({
                value: item,
                label: item,
              }))}
              value={form.values.experience}
              onValueChange={(value: CheckBoxOption) => {
                form.setValue("experience", value);
              }}
            />
          </div>

          <div>
            <Label className="mb-3">Role</Label>
            <Select>
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((item, index: number) => (
                  <SelectItem key={`roleitem${index}`} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-3">Localtions</Label>
            <ChipsField
              name="locations"
              values={form.values.locations}
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
                        <p className="text-sm uppercase text-muted-foreground">
                          {item.ab}({item.code})
                        </p>
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
              placeholder="+1 Location"
              onValuesChange={(values: (string | number)[]) => {
                form.setValue("locations", values);
              }}
            />
          </div>
          <CheckboxesField
            label="Benefits"
            options={benefits.map((item) => ({ label: item, value: item }))}
            values={form.values.benefits}
            onCheckedChange={(item: CheckBoxOption, checked: boolean) => {
              form.pushToggle("benefits", item.value, checked as boolean);
            }}
            error={form.errors.benefits}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
