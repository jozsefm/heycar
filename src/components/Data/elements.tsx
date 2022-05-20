import styled from 'styled-components';
import { border, BorderProps, color, ColorProps, flexbox, FlexboxProps, typography, TypographyProps } from 'styled-system';
import { VictoryPie } from 'victory';

export const Reports = styled.p<ColorProps & TypographyProps>`
  ${color}
  ${typography}
  font-family: "Roboto-Bold", sans-serif;
  font-weight: 600;
`

export const Instruction = styled.p`
  color: #7e8299;
  font-size: 18px;
  font-weight: 600;
  margin-top: 5px;
  max-width: 580px;
`

export const ProjectSummary = styled.button<BorderProps & TypographyProps>`
  ${border}
  ${typography}
  background: white;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  font-weight: 800;
  border: 0;
`

export const LineWrapper = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 6px;
  }
`

export const ProjectDetails = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-left: 5px;
  overflow-y: scroll;
  max-height: 300px;
  margin-bottom: 6px;
  margin-left: 20px;
  
  & >:nth-child(odd) {
    background: white;
  }
  
  & >:nth-child(even) {
    background: transparent;
  }
`

export const ProjectDetailsItem = styled.div`
  display: flex;
  width: 99.75%;
  border-radius: 6px;
  padding: 10px 25px 10px 5px;

  &:first-of-type {
    margin-top: 15px;
  }
`

export const StickyProjectDetailsItem = styled(ProjectDetailsItem)`
  position: sticky;
  top: 15px;
`

export const ProjectCol = styled.div<FlexboxProps>`
  ${flexbox}
  display: flex;
  width: 100%;
`

export const TwoColumns = styled.div`
  display: flex;
  width: 100%;

  & >:nth-child(1) {
    width: 58%;
  }
  & >:nth-child(2) {
    width: 42%;
  }
`

export const SecondCol = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`

export const Chart = ({ data }) => {
  const values = Object.values(data).map(value => Object.values(value))
  const total = values.reduce((acc, curr) => acc + curr[0], 0)

  return (
    <svg viewBox="0 0 400 400">
      <VictoryPie
        standalone={false}
        width={400} height={400}
        data={values.map(value => ({
          x: `${Math.round(((value as unknown as number) / total) * 100)}%`,
          y: value
        }))}
        innerRadius={75} labelRadius={100}
        style={{ labels: { fontSize: 20, fill: "white" } }}
        colorScale={['#A259FF', '#F24E1E', '#FFC107', '#6497B1']}
        labelPosition='centroid'
        padAngle={() => 0.5}
      />
    </svg>
  )
}