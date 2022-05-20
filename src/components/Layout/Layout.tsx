import Footer from 'components/Layout/Footer'
import Header from 'components/Layout/Header'
import SideBar from 'components/Layout/SideBar'
import styled from 'styled-components'
import { color, ColorProps } from 'styled-system'

const Main = styled.main`
  ${color}
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 73%;
  width: 100%;
`

const Page = styled.div<ColorProps>`
  ${color}
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export default function PageLayout({ children }) {
  return (
    <Page bg="appBackground">
      <Header />
      <Main>
        <SideBar />
        {children}
      </Main>
      <Footer />
    </Page>
  )
}
