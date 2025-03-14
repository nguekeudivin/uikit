"use client";
import clsx from "clsx";
import {
  Briefcase,
  Calendar,
  ChartNoAxesCombined,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Folder,
  Landmark,
  LayoutDashboard,
  MailOpen,
  MapPinned,
  MessageSquareText,
  Presentation,
  ReceiptText,
  Rss,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  SquareKanban,
  SquareUser,
  TicketsPlane,
} from "lucide-react";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TopBar from "./AppTopBar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface AppSidebarProps {
  children: ReactNode;
}

export function AppSidebar({ children }: AppSidebarProps) {
  const [openMenu, setOpenMenu] = useState<Record<string, boolean>>({});
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  useEffect(() => {
    console.log(pathname);
    menu().forEach((item) => {
      if (item.menu != undefined) {
        if (
          item.menu.map((menuItem: any) => menuItem.route).includes(pathname)
        ) {
          setOpenMenu((prev: Record<string, boolean>) => ({
            ...prev,
            [item.label]: !prev[item.label],
          }));
        }
      }
    });
  }, []);

  const [isReduce, setIsReduce] = useState<boolean>(false);

  const MenuItemElement = ({ item }: { item: any }) => {
    return (
      <div
        className={clsx(
          ` flex items-center py-2 rounded-md cursor-pointer justify-between relative`,
          {
            "bg-primary/20": item.route == pathname,
            "bg-primary/10": openMenu[item.label],
            "px-2": !isReduce,
          }
        )}
      >
        <div
          onClick={() => {
            setOpenMenu((prev: Record<string, boolean>) => ({
              ...prev,
              [item.label]: !prev[item.label],
            }));
          }}
          className="items-center flex justify-between w-full"
        >
          {!isReduce ? (
            <>
              <div className="w-full flex gap-3 text-xs">
                <item.icon
                  className={cn(`w-5 h-5 text-gray-500`, {
                    "text-primary": item.route == pathname,
                  })}
                />
                <div className="text-gray-600 text-base  text-center">
                  {item.label}
                </div>
              </div>
              {item.menu != undefined && (
                <div>
                  {openMenu[item.label] ? (
                    <ChevronRight className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              )}
            </>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-full">
                    <item.icon
                      className={cn(
                        `w-5 h-5 text-gray-500 mx-auto w-6 h-6 stroke-1`,
                        {
                          "text-primary": item.route == pathname,
                        }
                      )}
                    />
                    <div className="text-gray-600 text-base  text-center text-xs  w-full">
                      {item.label}
                    </div>
                  </div>
                </TooltipTrigger>
                {item.menu != undefined && (
                  <TooltipContent side="right">
                    <ul className="min-w-24 space-y-1">
                      {item.menu.map((menuItem: any) => (
                        <li key={`menuItem${menuItem.label}`}>
                          <a href={menuItem.route as string}>
                            <button
                              className={clsx(
                                "rounded-lg  w-full inline-flex  px-2 py-2 hover:bg-gray-100 text-muted-foreground text-base",
                                {
                                  "bg-gray-100": menuItem.route == pathname,
                                  "bg-white": menuItem.route != pathname,
                                }
                              )}
                            >
                              {menuItem.label}
                            </button>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {item.badge != undefined && (
          <>
            <div className="hidden lg:flex w-6 h-6   rounded bg-red-400 text-white rounded-full inline-flex items-center justify-center text-xs">
              {item.badge}
            </div>
            <div className="lg:hidden absolute w-3 h-3 bg-red-400 rounded-full right-3 top-2"></div>
          </>
        )}
      </div>
    );
  };

  const Menu = () => {
    return (
      <div
        className={cn(
          "bg-white rounded-md h-screen  overflow-hidden hover:overflow-auto scrollbar-thin ",
          {
            "scrollbar-thumb-transparent scrollbar-track-transparent": isReduce,
          }
        )}
      >
        <div
          className={cn("w-[280px] p-4", {
            "w-[100px] p-2": isReduce,
          })}
        >
          <ul className="space-y-1">
            {menu().map((item, index) => (
              <li key={`mainLink${index}`}>
                {item.route != undefined ? (
                  <a href={item.route}>
                    <MenuItemElement item={item} />
                  </a>
                ) : (
                  <div className="w-full">
                    <MenuItemElement item={item} />
                    {item.menu != undefined && !isReduce && (
                      <ul
                        className={clsx("py-2 ml-6 relative overflow-hidden", {
                          hidden: !openMenu[item.label],
                        })}
                      >
                        {item.menu.map((menuItem: any) => (
                          <li
                            key={`menuItem${menuItem.label}`}
                            className="relative px-4 overflow-hidden"
                          >
                            <a href={menuItem.route as string}>
                              <button
                                className={clsx(
                                  "rounded-lg z-20  relative  w-full inline-flex  px-1 py-2 hover:bg-gray-100 text-muted-foreground",
                                  {
                                    "bg-gray-100": menuItem.route == pathname,
                                    "bg-white": menuItem.route != pathname,
                                  }
                                )}
                              >
                                {menuItem.label}
                              </button>
                            </a>
                            <div className="absolute rounded-bl-2xl  w-24 h-8 -top-2.5 left-0 border-l-2 border-b-2  border-gray-200"></div>
                          </li>
                        ))}
                        <div className="absolute  h-full -top-12 left-0 border-l-2 border-gray-300"></div>
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="h-24"></div>
      </div>
    );
  };

  return (
    <div>
      <div
        className={cn("fixed left-0 top-0 w-[300px] border-r hidden md:block", {
          "w-[100px]": isReduce,
        })}
      >
        <div className="py-4 border">
          <button
            onClick={() => {
              setIsReduce(!isReduce);
            }}
            className="absolute top-4 -right-3 p-1 z-50 rounded-full inline-flex items-center justify-center border bg-white"
          >
            {isReduce ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
          <h2 className="text-2xl text-gray-900 font-bold px-4 text-center text-green-600">
            {isReduce ? (
              <span className="text-4xl">M</span>
            ) : (
              <span> Maximals </span>
            )}
          </h2>
        </div>
        <Menu />
      </div>

      <Sheet
        open={showMobileMenu}
        onOpenChange={(value) => {
          setShowMobileMenu(value);
        }}
      >
        <SheetContent side="left" className="p-0">
          <SheetHeader className="sr-only">
            <SheetTitle className="text-2xl text-gray-900 font-bold px-4 text-center text-green-600">
              Maximals
            </SheetTitle>
          </SheetHeader>
          <Menu />
        </SheetContent>
      </Sheet>
      <main
        className={cn("pl-0 md:pl-[280px]", {
          "md:pl-[115px]": isReduce,
        })}
      >
        <TopBar
          toggleMenu={() => {
            setShowMobileMenu(!showMobileMenu);
          }}
        />

        <div className="">{children}</div>
      </main>
    </div>
  );
}

export function menu() {
  return [
    {
      label: "App",
      icon: LayoutDashboard,
      route: "/applications",
    },
    {
      label: "Emails",
      route: "/emails",
      icon: MailOpen,
    },
    {
      label: "Calendar",
      route: "/calendar",
      icon: Calendar,
    },
    {
      label: "Ecommerce",
      icon: ShoppingBag,
      route: "/ecommerce",
    },
    {
      label: "Analytics",
      icon: ChartNoAxesCombined,
      route: "/analytics",
    },
    {
      label: "Banking",
      icon: Landmark,
      route: "/banking",
    },
    {
      label: "Booking",
      icon: TicketsPlane,
      route: "/booking",
    },
    {
      label: "File",
      icon: FileText,
      route: "/file",
    },
    {
      label: "Course",
      icon: Presentation,
      route: "/course",
    },
    {
      label: "User",
      icon: SquareUser,
      menu: [
        {
          label: "Profile",
          route: "/user/profile",
        },
        {
          label: "Cards",
          route: "/user/cards",
        },
        {
          label: "List",
          route: "/user/list",
        },
        {
          label: "Create",
          route: "/user/create",
        },
        {
          label: "Edit",
          route: "/user/edit",
        },
        {
          label: "Account",
          route: "/user/account",
        },
      ],
    },
    {
      label: "Product",
      icon: ShoppingBasket,
      menu: [
        {
          label: "List",
          route: "/product/list",
        },
        {
          label: "Details",
          route: "/product/details",
        },

        {
          label: "Create",
          route: "/product/create",
        },
        {
          label: "Edit",
          route: "/product/edit",
        },
      ],
    },
    {
      label: "Order",
      icon: ShoppingCart,
      menu: [
        {
          label: "List",
          route: "/order/list",
        },
        {
          label: "Details",
          route: "/order/details",
        },
      ],
    },
    {
      label: "Invoice",
      icon: ReceiptText,
      menu: [
        {
          label: "List",
          route: "/invoice/list",
        },
        {
          label: "Details",
          route: "/invoice/details",
        },

        {
          label: "Create",
          route: "/invoice/create",
        },
        {
          label: "Edit",
          route: "/invoice/edit",
        },
      ],
    },
    {
      label: "Blog",
      icon: Rss,
      menu: [
        {
          label: "List",
          route: "/blog/list",
        },
        {
          label: "Details",
          route: "/blog/details",
        },

        {
          label: "Create",
          route: "/blog/create",
        },
        {
          label: "Edit",
          route: "/blog/edit",
        },
      ],
    },
    {
      label: "Job",
      icon: Briefcase,
      menu: [
        {
          label: "List",
          route: "/job/list",
        },
        {
          label: "Details",
          route: "/job/details",
        },

        {
          label: "Create",
          route: "/job/create",
        },
        {
          label: "Edit",
          route: "/job/edit",
        },
      ],
    },
    {
      label: "Tour",
      icon: MapPinned,
      menu: [
        {
          label: "List",
          route: "/tour/list",
        },
        {
          label: "Details",
          route: "/tour/details",
        },

        {
          label: "Create",
          route: "/tour/create",
        },
        {
          label: "Edit",
          route: "/tour/edit",
        },
      ],
    },
    {
      label: "File manager",
      icon: Folder,
      route: "/file-manager",
    },

    {
      label: "Chat",
      route: "/chat",
      icon: MessageSquareText,
    },
    {
      label: "Kanban",
      route: "/kanban",
      icon: SquareKanban,
    },
  ];
}
