'use client'
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/Studio.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api'
import { locate } from '@/sanity/plugins/locate'
import { pageStructure, singletonPlugin } from '@/sanity/plugins/settings'
import cta from '@/sanity/schemas/objects/cta'
import header from '@/sanity/schemas/objects/header'
import openGraph from '@/sanity/schemas/objects/openGraph'
import waitingListForm from '@/sanity/schemas/objects/waitingListForm'
import home from '@/sanity/schemas/singletons/home'
import settings from '@/sanity/schemas/singletons/settings'
import waitingList from '@/sanity/schemas/singletons/waitingList'
import headerImage from '@/sanity/schemas/types/headerImage'
import sectionSelector from '@/sanity/schemas/types/sectionSelector'

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'blrplt'

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      home,
      settings,
      waitingList,
      // Objects
      header,
      cta,
      openGraph,
      waitingListForm,
      // Types
      sectionSelector,
      headerImage,
    ],
  },
  plugins: [
    structureTool({
      structure: pageStructure([home, settings, waitingList]),
    }),
    presentationTool({
      locate,
      previewUrl: {
        previewMode: {
          enable: '/api/draft',
        },
      },
    }),
    singletonPlugin([home.name, settings.name, waitingList.name]),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
