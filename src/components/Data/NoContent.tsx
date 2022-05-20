import Image from 'next/image'
import styled from 'styled-components'
import { Instruction, Reports } from './elements'

const NoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
`

const ImageWrapper = styled.div`
  margin-top: 60px;
`

export default function NoContentComponent() {
  return (
    <NoContent>
      <Reports color="regularText" fontSize={1}>
        No reports
      </Reports>
      <Instruction>
        Currently you have no data for the reports to be generated. <br />
        Once you start generating traffic through the Balance application the reports will be shown.
      </Instruction>
      <ImageWrapper>
        <Image
          src="/images/noresults.png"
          alt="placeholder with abstract shapes"
          width={1510 * 0.3}
          height={651 * 0.3}
        />
      </ImageWrapper>
    </NoContent>
  )
}
