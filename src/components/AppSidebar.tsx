"use client";
import clsx from "clsx";
import {
  Briefcase,
  Calendar,
  ChartNoAxesCombined,
  ChevronDown,
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
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MenuItem } from "@/lib/types";
import Link from "next/link";

export default function AppSidebar() {
  const menu = (): MenuItem[] =>
    [
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
            route: "/user/list",
          },
          {
            label: "Details",
            route: "/user/details",
          },

          {
            label: "Create",
            route: "/user/create",
          },
          {
            label: "Edit",
            route: "/user/edit",
          },
        ],
      },
      {
        label: "Order",
        icon: ShoppingCart,
        menu: [
          {
            label: "List",
            route: "/user/list",
          },
          {
            label: "Details",
            route: "/user/details",
          },
        ],
      },
      {
        label: "Invoice",
        icon: ReceiptText,
        menu: [
          {
            label: "List",
            route: "/user/list",
          },
          {
            label: "Details",
            route: "/user/details",
          },

          {
            label: "Create",
            route: "/user/create",
          },
          {
            label: "Edit",
            route: "/user/edit",
          },
        ],
      },
      {
        label: "Blog",
        icon: Rss,
        menu: [
          {
            label: "List",
            route: "/user/list",
          },
          {
            label: "Details",
            route: "/user/details",
          },

          {
            label: "Create",
            route: "/user/create",
          },
          {
            label: "Edit",
            route: "/user/edit",
          },
        ],
      },
      {
        label: "Job",
        icon: Briefcase,
        menu: [
          {
            label: "List",
            route: "/user/list",
          },
          {
            label: "Details",
            route: "/user/details",
          },

          {
            label: "Create",
            route: "/user/create",
          },
          {
            label: "Edit",
            route: "/user/edit",
          },
        ],
      },
      {
        label: "Tour",
        icon: MapPinned,
        menu: [
          {
            label: "List",
            route: "/user/list",
          },
          {
            label: "Details",
            route: "/user/details",
          },

          {
            label: "Create",
            route: "/user/create",
          },
          {
            label: "Edit",
            route: "/user/edit",
          },
        ],
      },
      {
        label: "File manager",
        icon: Folder,
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
    ].map((item) => {
      if (item.icon != undefined) {
        const IconComponent = item.icon;
        return {
          ...item,
          icon: <IconComponent className="w-5 h-5" />,
        };
      } else {
        return {
          ...item,
          icon: undefined,
        };
      }
    });

  const [activePage, setActivePage] = useState<string>("/dashboard");
  const [openMenu, setOpenMenu] = useState<Record<string, boolean>>({});

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    menu().forEach((item) => {
      if (pathname.includes(item.route as string)) {
        setActivePage(item.route as string);
      }
    });
  }, []);

  const MenuItemElement = ({ item }: { item: MenuItem }) => {
    return (
      <div
        className={clsx(
          ` flex items-center px-4 py-2 rounded-md cursor-pointer justify-between relative`,
          {
            "bg-primary/20": item.route == activePage,
            "bg-gray-100": openMenu[item.label],
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
          <div className="flex">
            <span
              className={clsx(`text-xl text-gray-500`, {
                "text-primary": item.label == activePage,
              })}
            >
              {item.icon}
            </span>
            <span className="ml-3 text-gray-600 hidden lg:block">
              {item.label}
            </span>
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

  return (
    <div>
      <h2 className="text-2xl text-gray-900 font-bold px-4"> Maximals </h2>
      <ul className="mt-4 space-y-1">
        {menu().map((item, index) => (
          <li key={`mainLink${index}`}>
            {item.route != undefined ? (
              <Link href={item.route}>
                <MenuItemElement item={item} />
              </Link>
            ) : (
              <div className="w-full">
                <MenuItemElement item={item} />
                {item.menu != undefined ? (
                  <ul
                    className={clsx("py-2 ml-6 relative overflow-hidden", {
                      hidden: !openMenu[item.label],
                    })}
                  >
                    {item.menu.map((menuItem) => (
                      <li
                        key={`menuItem${menuItem.label}`}
                        className="relative px-4 overflow-hidden"
                      >
                        <Link href={menuItem.route as string}>
                          <button className="rounded-lg z-20  relative  w-full inline-flex bg-white px-4 py-2 hover:bg-gray-100">
                            {menuItem.label}
                          </button>
                        </Link>
                        <div className="absolute rounded-bl-2xl  w-24 h-8 -top-2.5 left-0 border-l border-b  border-gray-300"></div>
                      </li>
                    ))}
                    <div className="absolute  h-full -top-12 left-0 border-l border-gray-300"></div>
                  </ul>
                ) : null}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
