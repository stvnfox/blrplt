import HomePage from '@/components/pages/home/HomePage'
import WaitingList from '@/components/pages/waiting/WaitingList'
import { loadSettings } from '@/sanity/loader/loadQuery'

export default async function IndexRoute() {
  const { data } = await loadSettings()
  const isWaitingList = data.waitingList

  if(isWaitingList) {
    return <WaitingList/>
  } else {
    return <HomePage/>
  }
}
