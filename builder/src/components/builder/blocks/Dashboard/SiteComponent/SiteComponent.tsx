import { UserSite } from "@/providers/BuilderContextProvider"
import { FunctionComponent } from "react"
import { UpdateSiteForm } from "./components/UpdateSiteForm"

type SiteComponentProps = {
    site: UserSite
}

export const SiteComponent: FunctionComponent<SiteComponentProps> = ({ site }) => {
    return (
        <div className="border rounded-md border-neutral-100 px-6 py-4 my-6">
            <UpdateSiteForm site={site} />
        </div>
    )
}