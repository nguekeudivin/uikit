import { ReactNode } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";

interface PageContentProps {
  title?: string;
  links?: any;
  action?: ReactNode;
  children: ReactNode;
}

export default function PageContent({
  title,
  links,
  action,
  children,
}: PageContentProps) {
  const routes = {
    Dashboard: "/",
    ...links,
  };

  const istLastRoute = (index: number) => {
    return index == Object.keys(routes).length - 1;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {(title != undefined || links != undefined || action != undefined) && (
        <div className="flex items-center justify-between">
          <div>
            {title != undefined && (
              <h2 className="text-3xl font-bold">{title}</h2>
            )}
            {links != undefined && (
              <div className="flex items-center gap-4 mt-2">
                {Object.entries(routes).map(
                  ([label, route]: any, index: number) => (
                    <div
                      key={`breakcrumb${index}`}
                      className="flex items-center gap-4"
                    >
                      {istLastRoute(index) ? (
                        <span className="text-muted-foreground">{label}</span>
                      ) : (
                        <>
                          <Link href={route}>
                            <span
                              className={clsx({
                                "text-muted-foreground": istLastRoute(index),
                              })}
                            >
                              {label}
                            </span>
                          </Link>{" "}
                          <div className="bg-gray-400 w-1 h-1 rounded-full" />
                        </>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
          <div>{action != undefined && <>{action}</>}</div>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
