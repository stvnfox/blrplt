import { SanityDocument } from "next-sanity"

import { sanityFetch } from "../../sanity/lib/fetch"
import { HEADER_QUERY } from "../../sanity/lib/queries"

export default async function Home() {
  const header = await sanityFetch<SanityDocument>({
    query: HEADER_QUERY,
  })
  
  return (
    <>
      <h1>{header.title}</h1>
      <h2>{header.subtitle}</h2>
      <p>{header.intro}</p>
    </>
  );
}
