"use client";

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
import { cn, formatDollars, paginateList } from "@/lib/utils";
import {
  Calendar,
  ChevronDown,
  EllipsisVertical,
  Eye,
  MapPin,
  Pencil,
  Plus,
  Star,
  Trash,
  Users,
} from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import FiltersValuesList from "@/components/common/table/FilterValuesList";
import FullPagination from "@/components/common/FullPagination";
import TourFilterSheets from "./TourFiltersList";
import { tours } from "@/api-call/mocks/tours";
import { format } from "date-fns";

export default function TourListPage() {
  const search = useSearch<any>({
    defaultResults: paginateList(tours, 1, 9),
    // predicate for static search.
    predicate: (item: any, { keyword }) => {
      return item.name.toLowerCase().includes(keyword?.toLowerCase());
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
      guides: [],
      startDate: undefined,
      endDate: undefined,
      destinations: [],
      services: [],
    },
    schema: z.object({
      startDate: z.date({ required_error: "Start date is required" }), // Required date
      endDate: z.date({ required_error: "End date is required" }), // Required date
      destinations: z
        .array(
          z.object({
            name: z.string().min(1, "Location name is required"),
            ab: z.string().min(1, "Location abbreviation is required"),
            code: z.string().min(1, "Location code is required"),
          })
        )
        .min(1, "At least one location is required"),
      guides: z
        .array(
          z.object({
            name: z.string().min(1, "Guide name is required"),
            avatar: z.string().min(1, "Guide avatar abbreviation is required"),
          })
        )
        .min(1, "At least one location is required"),
      services: z.array(z.string()).min(1, "1 services is required"), // Validate services (optional)
    }),
    onUpdate: (values: any) => {
      let valid = form.getValidValues(values);
      if (valid.hasOwnProperty("destinations")) {
        valid = {
          ...valid,
          destinations: valid.destinations.map((item: any) => item.name),
        };
      }

      if (valid.hasOwnProperty("guides")) {
        valid = {
          ...valid,
          guides: valid.guides.map((item: any) => item.name),
        };
      }

      search.apply(valid);
    },
  });

  return (
    <PageContent
      title="List"
      links={{ Tour: "#", List: "#" }}
      action={
        <Link href="/job/create">
          <Button variant="dark" size="sm" className="mt-4 md:mt-0">
            <Plus />
            New Tour
          </Button>
        </Link>
      }
      className="max-w-6xl pb-4"
    >
      <div className="flex flex-wrap items-center justify-between mt-8">
        <div className="relative w-full">
          <SearchField
            onChange={search.handleChange}
            className="w-full md:w-auto"
          />
          <div className=""></div>
        </div>
        <div className="flex gap-2 mt-2 md:mt-0">
          <TourFilterSheets form={form} />

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
          duration: "Duration",
          destinations: "Destinations",
          services: "Services",
          guides: "Guides",
          startDate: "Start Date",
          endDate: "End Date",
        }}
        onValueRemoved={(id: string) => {
          if (Object.keys(form.values).includes(id)) form.resetValue(id);
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {search.results.data.map((item, index) => {
          return (
            <div key={`job${index}`} className="shadow rounded-xl relative p-2">
              <DropdownMenu>
                <DropdownMenuTrigger className="absolute bottom-4 right-4 hover:bg-gray-100 p-2 focus:border-none focus:outline-none rounded-full transition-all">
                  <EllipsisVertical className="w-4 h-4 text-gray-800" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/tour/details">
                      <Eye />
                      <span>View</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/tour/edit">
                      <Pencil />
                      <span> Edit</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500 bg-red-50 focus:text-red-500 focus:bg-red-100">
                    <Trash className="text-red-500" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center gap-1">
                <div
                  className="w-full bg-cover rounded-lg bg-center h-48 bg-gray-100 relative"
                  style={{ backgroundImage: `url(${item.images[0].src})` }}
                >
                  <div className="flex items-center justify-between p-2">
                    <div className="rounded-lg px-1.5 bg-gray-800 font-semibold">
                      <span className="line-through text-gray-300">
                        {formatDollars(item.price)}
                      </span>
                      <span className="text-white">
                        {" "}
                        {formatDollars(item.price)}
                      </span>
                    </div>
                    <div className="rounded-lg px-1 bg-yellow-50 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="">4.7</span>
                    </div>
                  </div>
                </div>
                <div className="w-24 shrink-0">
                  <div
                    className="h-24 bg-cover bg-center rounded-xl bg-gray-100"
                    style={{ backgroundImage: `url(${item.images[1]?.src})` }}
                  ></div>
                  <div
                    className="h-24 mt-1 bg-cover bg-center rounded-xl bg-gray-100"
                    style={{ backgroundImage: `url(${item.images[2]?.src})` }}
                  ></div>
                </div>
              </div>
              <div className="p-3">
                <p className="text-muted-foreground text-sm mt-2">
                  {format(item.postedDate, "dd MMM yyy")}
                </p>
                <h2 className="font-semibold text-lg mt-1"> {item.name}</h2>
                <div className="mt-1 space-y-2">
                  {[
                    {
                      icon: MapPin,
                      text: item.destination,
                      className: "text-red-500",
                    },
                    {
                      icon: Calendar,
                      text: format(item.postedDate, "dd MMM yyy"),
                      className: "text-sky-500",
                    },
                    {
                      icon: Users,
                      text: `16 Bookers`,
                      className: "text-sky-500",
                    },
                  ].map((item, index) => (
                    <div
                      key={`tour${index}`}
                      className="flex items-center gap-2"
                    >
                      <item.icon className={cn("w-5 h-5", item.className)} />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <footer className="mt-12 justify-center flex">
        <FullPagination
          pagination={search.results}
          onPrevious={() => {
            if (search.results.currentPage != 1)
              search.setResults(
                paginateList(
                  search.results.allData,
                  search.results.currentPage - 1,
                  9
                )
              );
          }}
          onNext={() => {
            if (search.results.currentPage != search.results.lastPage)
              search.setResults(
                paginateList(
                  search.results.allData,
                  search.results.currentPage + 1,
                  9
                )
              );
          }}
          onGoto={(page) => {
            search.setResults(paginateList(search.results.allData, page, 9));
          }}
        />
      </footer>
    </PageContent>
  );
}
