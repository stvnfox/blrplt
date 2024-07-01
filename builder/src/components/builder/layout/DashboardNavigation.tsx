"use client"

import clsx from "clsx"
import { FunctionComponent } from "react"
import { usePathname } from "next/navigation"
import { useBuilderContext } from "@/providers/BuilderContextProvider"

export const DashboardNavigation: FunctionComponent = () => {
    const pathname = usePathname()
    const { sites } = useBuilderContext()
    console.log(sites)
    const menuItems = [
        {
            label: "builder preview site",
            href: "/",
            collapsible: true,
            open: true,
            children: sites[0].pages,
        },
    ]

    return (
        <aside className="flex">
            <nav>
                <ul className="flex flex-col">
                    {menuItems.map((item, index) => (
                        <li key={`nav-${index}`}>
                            {item.collapsible ? (
                                <details open={item.open}>
                                    <summary className="mb-4">{item.label}</summary>
                                    <div>
                                        <ul className="flex flex-col gap-6">
                                            {item.children.map((child) => (
                                                <li
                                                    key={`nav-${child.id}`}
                                                    className="last:mb-6"
                                                >
                                                    <a
                                                        href={child.url}
                                                        className={clsx(
                                                            "rounded border border-neutral-300 px-3 py-2 transition-colors hover:border-black hover:bg-black hover:text-white",
                                                            child.url === pathname &&
                                                                "border-neutral-100 bg-neutral-100"
                                                        )}
                                                    >
                                                        {child.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </details>
                            ) : (
                                <a
                                    href={item.href}
                                    className={clsx(
                                        "rounded border border-neutral-300 px-3 py-2 transition-colors hover:border-black hover:bg-black hover:text-white"
                                        // activeNavItem && "border-neutral-100 bg-neutral-100"
                                    )}
                                >
                                    {item.label}
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}
