import { useAppSelector } from 'app/hooks'
import Image from 'next/image'
import { selectUserInitials, selectUserName } from 'state/userSlice'
import styled from 'styled-components'
import { border, BorderProps, color, ColorProps, typography, TypographyProps } from 'styled-system'

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 9%;
  width: 100%;
  border-bottom: 2px solid #f3f6f9;
`

const HeaderItem = styled.div`
  display: flex;
  width: auto;
  height: 100%;
  align-items: center;
  justify-content: center;

  &:last-of-type {
    padding-right: 7%;
  }
`

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 131px;
  position: relative;
`

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: auto;
`

const Initials = styled.div<BorderProps>`
  ${border}
  display: flex;
  align-items: center;
  justify-content: center;
  width: 51px;
  height: 51px;
  background: #f6ca65;
  color: white;
  font-size: 25px;
  letter-spacing: 1.5px;
  font-weight: bold;
`

const UserName = styled.div<ColorProps & TypographyProps>`
  ${color}
  ${typography}
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 100%;
  margin-left: 10px;
  letter-spacing: 1px;
  font-weight: 900;
  letter-spacing: 0.5px;
`

export default function HeaderComponent() {
  const userName = useAppSelector(selectUserName)
  const userInitials = useAppSelector(selectUserInitials)

  return (
    <Header>
      <HeaderItem>
        <Logo>
          <Image src="/images/b.png" alt="a blue capital B character" width={123 * 0.26} height={184 * 0.26} />
        </Logo>
        <Menu>
          <Image src="/images/menu.png" alt="3 lines menu toggle" width={143 * 0.25} height={127 * 0.25} />
        </Menu>
      </HeaderItem>
      <HeaderItem>
        <Initials borderRadius={0}>{userInitials}</Initials>
        <UserName fontSize={0} color="pageText">
          {userName}
        </UserName>
      </HeaderItem>
    </Header>
  )
}
