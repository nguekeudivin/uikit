"use client";

import fetchJobs from "@/api-call/endpoints/jobs";
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
import { ChevronDown, CloudUpload, ListFilter, Plus } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import FilterSheets from "./FilterSheets";

export default function JobListPage() {
  const search = useSearch<Job>({
    defaultResults: paginateList(jobs),
    // predicate for static search.
    predicate: (item: Job, { keyword }) => {
      return item.title.toLowerCase().includes(keyword?.toLowerCase());
    },
    // fetch when we want to use backend search.
    fetchSuggestions: ({ keyword, filters }) => {
      return fetchJobs({ keyword, filters });
    },
    // Run the search
    // fetch when we want to use backend search.
    fetch: ({ keyword, filters }) => {
      return fetchJobs({ keyword, filters });
    },
    sort: ({ keyword, filters, sorting }) => {
      return fetchJobs({ keyword, filters, sorting });
    },
  });

  const form = useSimpleForm({
    defaultValues: {
      title: "",
      description: "",
      content: "",
      employmentType: [],
      experience: "",
      role: "",
      skills: [],
      workingSchedule: [],
      locations: [],
      publish: true,
      expiredAt: undefined,
      salaryType: "",
      salary: "",
      benefits: [],
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
        <div>
          <SearchField onChange={search.handleChange} />
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
    </PageContent>
  );
}
