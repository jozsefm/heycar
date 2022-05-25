import { useAppDispatch, useAppSelector } from 'app/hooks'
import Image from 'next/image'
import { useCallback } from 'react'
import {
  getReports,
  selectCurrentGateway,
  selectCurrentProject,
  selectGateways,
  selectProjects,
  selectReports,
  setDisplayedGateway,
  setDisplayedProject,
  setSelectedGateway,
  setSelectedProject,
} from 'state/dataSlice'
import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'
import { Gateway, Project } from 'types/Entities'
import Content from './Content'
import { Instruction, Reports } from './elements'
import NoContent from './NoContent'
import Select from './Select'

const Data = styled.section`
  display: flex;
  flex-direction: column;
  width: 86%;
  height: 100%;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`

const TopLine = styled.div<SpaceProps>`
  ${space}
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const Buttons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  column-gap: 28px;
`

const FakeDateSelector = styled.button`
  background: #1bc5bd;
  width: 150px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  height: 38px;
  border: none;
  padding: 0 16px;

  p {
    width: 100%;
    text-align: center;
  }
`

const GenerateButton = styled.button`
  background: #005b96;
  width: 150px;
  border-radius: 6px;
  color: white;
  height: 38px;
  border: none;
  padding: 0 16px;
  text-align: center;
`

export default function DataComponent() {
  const dispatch = useAppDispatch()
  const projects = useAppSelector(selectProjects)
  const gateways = useAppSelector(selectGateways)
  const reports = useAppSelector(selectReports)
  const selectedProject = useAppSelector(selectCurrentProject)
  const selectedGateway = useAppSelector(selectCurrentGateway)

  const generate = useCallback(() => {
    if (selectedProject && selectedGateway) {
      const projectId = selectedProject.id === 'all' ? undefined : selectedProject.id
      const gatewayId = selectedGateway.id === 'all' ? undefined : selectedGateway.id
      dispatch(getReports({ projectId, gatewayId }))
      dispatch(setDisplayedProject(selectedProject))
      dispatch(setDisplayedGateway(selectedGateway))
    } else {
      console.error('Missing parameters')
    }
  }, [dispatch, selectedProject, selectedGateway])

  const selectProject = useCallback((item: Project) => dispatch(setSelectedProject(item)), [dispatch])
  const selectGateway = useCallback((item: Gateway) => dispatch(setSelectedGateway(item)), [dispatch])

  return (
    <Data>
      <TopLine pt="topPadding">
        <Description>
          <Reports color="regularText" fontSize={1}>
            Reports
          </Reports>
          <Instruction>Easily generate a report of your transactions</Instruction>
        </Description>
        <Buttons>
          <Select list={projects} onChange={selectProject} placeholder="Select project" />
          <Select list={gateways} onChange={selectGateway} placeholder="Select gateway" />
          <FakeDateSelector>
            <p>From date</p>
            <Image src="/images/calendar.png" alt="a graph" width={82 * 0.175} height={90 * 0.175} />
          </FakeDateSelector>
          <FakeDateSelector>
            <p>To date</p>
            <Image src="/images/calendar.png" alt="a graph" width={82 * 0.175} height={90 * 0.175} />
          </FakeDateSelector>
          <GenerateButton onClick={generate}>Generate report</GenerateButton>
        </Buttons>
      </TopLine>
      <ContentWrapper>{!reports.length ? <NoContent /> : <Content />}</ContentWrapper>
    </Data>
  )
}
