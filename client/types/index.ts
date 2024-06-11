import type { PortableTextBlock } from 'next-sanity'
import type { Image } from 'sanity'

import { OpenGraph } from './openGraph'
import { IWaitingListEmail, IWaitingListForm, IWaitingListSocial } from './waitingList'

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
  form?: IWaitingListForm 
  socials?: IWaitingListSocial[]
  email?: IWaitingListEmail
}
