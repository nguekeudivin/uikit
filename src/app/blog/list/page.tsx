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
import { kformat, paginateList } from "@/lib/utils";
import {
  ChevronDown,
  Ellipsis,
  Eye,
  MessageCircleMore,
  Pencil,
  Plus,
  Share2,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import FullPagination from "@/components/common/FullPagination";
import StatusFilters from "@/components/common/StatusFilters";
import { Post } from "@/types/posts";
import { listedPosts } from "@/api-call/mocks/posts";
import UserAvatar from "@/components/common/UserAvatar";
import { getBackground, getColor } from "@/lib/colors";

export default function BlogListPage() {
  const search = useSearch<Post>({
    defaultResults: paginateList(listedPosts, 1, 9),
    // predicate for static search.
    predicate: (item: Post, { keyword, filters }) => {
      let condition = item.title.toLowerCase().includes(keyword?.toLowerCase());

      if (filters.hasOwnProperty("status")) {
        if (filters.status != "") {
          condition = condition && item.status == filters.status;
        }
      }

      return condition;
    },
    perPage: 9,
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

  const status = [
    {
      label: "All",
      value: "",
      count: 20,
    },
    {
      label: "Publish",
      value: "publish",
      count: 12,
    },
    {
      label: "Draft",
      value: "draft",
      count: 10,
    },
  ];

  const getStatusLabel = (val: string) => {
    return status.find((item) => item.value == val)?.label;
  };

  return (
    <PageContent
      title="List"
      links={{ Blog: "#", List: "#" }}
      action={
        <Link href="/blog/create">
          <Button variant="dark" size="sm" className="mt-4 md:mt-0">
            <Plus />
            New post
          </Button>
        </Link>
      }
      className="max-w-6xl pb-4"
    >
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between mt-8">
        <div className="relative">
          <SearchField onChange={search.handleChange} />
          <div className=""></div>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
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

      <div className="mt-8">
        <StatusFilters
          status={status}
          filters={Object.entries(search.filters).map(([name, value]) => ({
            id: name,
            value,
          }))}
          onValueChange={(value: any) => {
            search.apply({
              status: value,
            });
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {search.results.data.map((item, index) => {
          return (
            <div
              key={`post${index}`}
              className="shadow rounded-xl relative p-6 flex items-center "
            >
              <aside>
                <div className="flex justify-between items-center">
                  <div
                    className="px-2 py-0.5 rounded-lg"
                    style={{
                      color: getColor(item.status),
                      backgroundColor: getBackground(item.status),
                    }}
                  >
                    {getStatusLabel(item.status)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {format(item.publishedDate, "dd MMM yyyy")}
                  </div>
                </div>
                <p className="mt-4 font-semibold">{item.title}</p>
                <p className="mt-2 text-muted-foreground">
                  {item.content.slice(0, 100)}
                </p>
                <div className="flex items-center justify-between items-center mt-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="hover:bg-gray-100 p-2 -ml-2 focus:border-none focus:outline-none rounded-full transition-all">
                      <Ellipsis className="w-4 h-4 text-gray-800" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link href="/blog/details">
                          <Eye />
                          <span>View</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/blog/edit">
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
                  <div className="flex items-center gap-4">
                    {[
                      {
                        icon: MessageCircleMore,
                        text: kformat(item.likes),
                      },
                      {
                        icon: Eye,
                        text: kformat(item.views),
                      },
                      {
                        icon: Share2,
                        text: kformat(item.shares),
                      },
                    ].map((item, index) => (
                      <div
                        key={`poststat${index}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
              <aside
                className="hidden sm:block shrink-0 bg-cover bg-center ml-4 rounded-xl h-full w-36 relative"
                style={{ backgroundImage: `url(${item.cover})` }}
              >
                <UserAvatar
                  className="absolute top-4 right-4"
                  name="author"
                  avatar="/assets/images/avatar/avatar-1.webp"
                />
              </aside>
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
