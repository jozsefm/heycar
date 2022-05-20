import Link from 'next/link'
import styled from 'styled-components'
import { color, ColorProps, typography, TypographyProps } from 'styled-system'

const Footer = styled.footer`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  height: 17%;
  width: 100%;
`

const Links = styled.div<ColorProps & TypographyProps>`
  ${color}
  ${typography}
  display: flex;
  margin-left: 122px;
  margin-bottom: 20px;
  font-weight: bold;

  a {
    color: inherit;
    font-size: inherit;
    text-decoration: none;
  }
`

const LinkSeparator = styled.div`
  margin: 0 7px;
  font-weight: normal;
`

export default function FooterComponent() {
  return (
    <Footer>
      <Links fontSize={0} color="pageText">
        <Link href={'#'}>Terms&amp;Conditions</Link>
        <LinkSeparator>|</LinkSeparator>
        <Link href={'#'}>Privacy policy</Link>
      </Links>
    </Footer>
  )
}
