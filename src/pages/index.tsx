import { useAppDispatch } from 'app/hooks'
import Data from 'components/Data/Data'
import PageLayout from 'components/Layout/Layout'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef } from 'react'
import { getGateways, getProjects } from 'state/dataSlice'
import { getUsers } from 'state/userSlice'

const IndexPage: NextPage = () => {
  const dispatch = useAppDispatch()
  const init = useRef(true)

  useEffect(() => {
    if (init.current) {
      init.current = false
      dispatch(getUsers())
      dispatch(getProjects())
      dispatch(getGateways())
    }
  }, [dispatch])
  
  return (
    <>
      <Head>
        <title>MPV Match</title>
      </Head>
      <PageLayout>
        <Data />
      </PageLayout>
    </>
  )
}

export default IndexPage
