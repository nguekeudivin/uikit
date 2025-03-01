"use client";

import { users } from "@/api-call/endpoints/users";
import FullPagination from "@/components/common/FullPagination";
import PageContent from "@/components/common/PageContent";
import { Button } from "@/components/ui/button";
import colors from "@/lib/colors";
import icons from "@/lib/icons";
import { kformat, paginateArray } from "@/lib/utils";
import { ListingPagination } from "@/types/shared";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ComponentType, useState } from "react";

export default function UsersCardsPage() {
  const [items, setItems] = useState<ListingPagination>(
    paginateArray(users, 1, 9)
  );

  return (
    <PageContent
      title="Users cards"
      links={{ User: "#", Cards: "#" }}
      className="max-w-6xl mb-24"
      action={
        <>
          <Link href="/user/create">
            <Button variant="dark">
              <Plus className="w-5 h-5" />
              New user
            </Button>
          </Link>
        </>
      }
    >
      <div className="grid grid-cols-3 gap-8 mt-8">
        {items.data.map((item, index) => (
          <div
            key={`friend${index}`}
            className="relative shadow rounded-xl overflow-hidden "
          >
            <header>
              <div
                className="w-full h-48 bg-cover"
                style={{ backgroundImage: `url(${item.cover})` }}
              ></div>
              <div className="-mt-9">
                <svg
                  className="text-white mx-auto w-36"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 144 62"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m111.34 23.88c-10.62-10.46-18.5-23.88-38.74-23.88h-1.2c-20.24 0-28.12 13.42-38.74 23.88-7.72 9.64-19.44 11.74-32.66 12.12v26h144v-26c-13.22-.38-24.94-2.48-32.66-12.12z"
                    fill="currentColor"
                    fillRule="evenodd"
                  ></path>
                </svg>
                <div
                  className="-mt-14 z-20 relative w-20 h-20 mx-auto  border-4 border-white bg-cover rounded-full"
                  style={{ backgroundImage: `url(${item.avatar})` }}
                ></div>
              </div>
            </header>

            <div className="p-8 pt-4  flex items-center flex-col gap-2">
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-muted-foreground">{item.role}</p>
              <div className="flex items-center space-x-2">
                {["facebook", "instagram", "linkedin", "twitter"].map(
                  (social) => {
                    const Icon = icons[social] as ComponentType as any;
                    return (
                      <Icon
                        key={`social${social}${index}`}
                        className="w-4 h-4"
                        style={{ color: colors[social] }}
                      />
                    );
                  }
                )}
              </div>
            </div>

            <ul className="flex grid grid-cols-3 p-4 border-t border-dashed">
              <li className="text-center">
                <p className="text-sm text-muted-foreground">Followers</p>
                <p className="text-xl font-semibold">
                  {kformat(item.followers)}
                </p>
              </li>
              <li className="text-center">
                <p className="text-sm text-muted-foreground">Following</p>
                <p className="text-xl font-semibold">
                  {kformat(item.following)}
                </p>
              </li>
              <li className="text-center">
                <p className="text-sm text-muted-foreground">Total Posts</p>
                <p className="text-xl font-semibold">
                  {kformat(item.totalPosts)}
                </p>
              </li>
            </ul>
          </div>
        ))}
      </div>
      <footer className="mt-12 justify-center flex">
        <FullPagination
          pagination={items}
          onPrevious={() => {
            if (items.currentPage != 1)
              setItems(paginateArray(users, items.currentPage - 1, 9));
          }}
          onNext={() => {
            if (items.currentPage != items.lastPage)
              setItems(paginateArray(users, items.currentPage + 1, 9));
          }}
          onGoto={(page) => {
            setItems(paginateArray(users, page, 9));
          }}
        />
      </footer>
    </PageContent>
  );
}
