import { groq } from "next-sanity";

export const HEADER_QUERY = groq`*[_type == "pages"][0].header`;