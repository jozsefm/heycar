import Image from 'next/image'
import styled from 'styled-components'

const SideBar = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 7%;
`

const SideBarItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 100%;
  position: relative;

  &:first-of-type {
    padding-top: ${({ theme }) => `${theme.space.topPadding}`};
  }

  &:not(:last-of-type) {
    margin-bottom: 30px;
  }
`

export default function SideBarComponent() {
  return (
    <SideBar>
      <SideBarItem>
        <Image src="/images/sidebar-1.png" alt="a graph" width={91 * 0.33} height={91 * 0.33} />
      </SideBarItem>
      <SideBarItem>
        <Image src="/images/sidebar-2.png" alt="4 squares" width={91 * 0.33} height={91 * 0.33} />
      </SideBarItem>
      <SideBarItem>
        <Image src="/images/sidebar-3.png" alt="desktop display" width={95 * 0.33} height={94 * 0.33} />
      </SideBarItem>
      <SideBarItem>
        <Image src="/images/sidebar-4.png" alt="pie chart" width={95 * 0.33} height={95 * 0.33} />
      </SideBarItem>
      <SideBarItem>
        <Image src="/images/sidebar-5.png" alt="power off icon" width={87 * 0.33} height={91 * 0.33} />
      </SideBarItem>
    </SideBar>
  )
}
