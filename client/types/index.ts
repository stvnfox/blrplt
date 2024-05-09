import type { PortableTextBlock } from 'next-sanity'
import type { Image } from 'sanity'

import { OpenGraph } from './openGraph'
import { WaitingListForm, WaitingListSocial } from './waitingList'

export interface MenuItem {
  _key: string
  section: string
}

export interface HomePagePayload {
  footer?: PortableTextBlock[]
  introduction?: PortableTextBlock[]
  title?: string
}

export interface SettingsPayload {
  waitingList?: boolean
  themePicker?: string
  footer?: PortableTextBlock[]
  menuItems?: MenuItem[]
  openGraph?: OpenGraph
  favicon?: Image
}

export interface WaitingListPayload {
  title: string
  introduction?: PortableTextBlock[]
  form?: WaitingListForm 
  successMessage?: string
  errorMessage?: string
  socials?: WaitingListSocial[]
}
