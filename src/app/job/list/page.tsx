"use client";

import { jobs } from "@/api-call/mocks/jobs";
import SearchField from "@/components/common/form/SearchField";
import PageContent from "@/components/common/PageContent";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import useSearch from "@/hooks/use-search";
import { useSimpleForm } from "@/hooks/use-simple-form";
import { paginateList } from "@/lib/utils";
import { ChevronDown, EllipsisVertical, Plus } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import FilterSheets from "./FilterSheets";
import FiltersValuesList from "@/components/common/table/FilterValuesList";

export default function JobListPage() {
  const search = useSearch<Job>({
    defaultResults: paginateList(jobs),
    // predicate for static search.
    predicate: (item: Job, { keyword }) => {
      return item.title.toLowerCase().includes(keyword?.toLowerCase());
    },
    // fetch when we want to use backend search.
    // fetchSuggestions: ({ keyword, filters }) => {
    //   return fetchJobs({ keyword, filters });
    // },
    // // Run the search
    // // fetch when we want to use backend search.
    // fetch: ({ keyword, filters }) => {
    //   return fetchJobs({ keyword, filters });
    // },
    // sort: ({ keyword, filters, sorting }) => {
    //   return fetchJobs({ keyword, filters, sorting });
    // },
  });

  const form = useSimpleForm({
    defaultValues: {
      employmentType: [],
      experience: "",
      role: "",
      skills: [],
      locations: [],
      benefits: [],
    },
    schema: z.object({
      employmentType: z
        .array(z.string())
        .min(1, "At least one employment type is required"),
      experience: z.string().min(1, "Experience is required"),
      role: z.string().min(1, "Role is required"),
      skills: z.array(z.string()).min(1, "At least one skill is required"),
      locations: z
        .array(
          z.object({
            name: z.string().min(1, "Location name is required"),
            ab: z.string().min(1, "Location abbreviation is required"),
            code: z.string().min(1, "Location code is required"),
          })
        )
        .min(1, "At least one location is required"),
      benefits: z.array(z.string()).min(1, "At least one benefit is required"),
    }),
    onUpdate: (values: any) => {
      let valid = form.getValidValues(values);
      if (valid.hasOwnProperty("locations")) {
        valid = {
          ...valid,
          locations: valid.locations.map((item: any) => item.name),
        };
      }
      search.apply(valid);
    },
  });

  return (
    <PageContent
      title="List"
      links={{ Job: "#", List: "#" }}
      action={
        <Link href="/job/create">
          <Button variant="dark" size="sm">
            <Plus />
            New Job
          </Button>
        </Link>
      }
      className="max-w-6xl pb-4"
    >
      <div className="flex items-center justify-between mt-8">
        <div className="relative">
          <SearchField onChange={search.handleChange} />
          <div className=""></div>
        </div>
        <div className="flex gap-2">
          <FilterSheets form={form} />

          <DropdownMenu>
            <DropdownMenuTrigger className="hover:bg-accent rounded-lg flex items-center px-4 py-2 gap-2">
              <span className="capitalize">
                Sort By: <strong>{search.sorting?.label} </strong>
              </span>
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() =>
                  search.sortBy({
                    attr: "createdAt",
                    label: "Latest",
                  })
                }
              >
                Latest
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  search.sortBy({ attr: "viewCount", label: "Popular" })
                }
              >
                Popular
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  search.sortBy({ attr: "createdAt", label: "Oldest" })
                }
              >
                Oldest
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <FiltersValuesList
        className="mt-6"
        resultCount={search.results.total}
        setFilterValue={(name: string, value: any) => {
          form.setValue(name, value);
        }}
        filters={Object.entries(search.filters).map(([name, value]) => ({
          id: name,
          value,
        }))}
        config={{
          employmentType: "Employment Type",
          experience: "Experience",
          role: "Role",
          skills: "Skills",
          locations: "Localtions",
          benefits: "Benefits",
        }}
        onValueRemoved={(id: string) => {
          if (Object.keys(form.values).includes(id)) form.resetValue(id);
        }}
      />
      <div className="grid grid-cols-3 gap-6 mt-8">
        {search.results.data.map((item, index) => (
          <div key={`job${index}`} className="shadow rounded-xl relative">
            <button className="absolute top-6 right-6">
              <EllipsisVertical className="w-5 h-5 text-muted-foreground" />
            </button>
            <div
              className="w-12 h-12 bg-cover rounded-md"
              style={{ backgroundImage: `url(${item.company.logo})` }}
            ></div>
          </div>
        ))}
      </div>
    </PageContent>
  );
}
