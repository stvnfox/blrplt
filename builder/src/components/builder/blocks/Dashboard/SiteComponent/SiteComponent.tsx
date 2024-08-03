import { FunctionComponent } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { UserSite } from "@/providers/BuilderContextProvider"

import { UpdateSiteForm } from "./components/UpdateSiteForm"
import { ArrowRight } from "lucide-react"

type SiteComponentProps = {
    site: UserSite
}

export const SiteComponent: FunctionComponent<SiteComponentProps> = ({ site }) => {
    const pathname = usePathname()
    return (
        <section className="px-4 md:px-8">
            <div className="border rounded-md border-neutral-100 px-6 py-4">
                <UpdateSiteForm site={site} />
                {
                    pathname !== "/settings" && (
                        <Link
                            href="/settings"
                            className="group flex items-center ml-auto w-fit text-sm"
                        >
                            see more settings
                            <ArrowRight className="group-hover:translate-x-1 transition-transform ml-1 " size={16} />
                        </Link>
                    )
                }
            </div>
        </section>
    )
}