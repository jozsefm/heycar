import { useAppSelector } from 'app/hooks'
import { useState } from 'react'
import {
  selectDispayedGateway,
  selectDisplayedProject,
  selectGatewayNamesById,
  selectGateways,
  selectProjects, selectReportsByGateway, selectReportsByProject, selectReportsByProjectAndGateway, selectReportSummariesByGateway, selectReportSummariesByProject, selectReportSummariesByProjectAndGateway
} from 'state/dataSlice'
import styled from 'styled-components'
import { border, BorderProps, color, ColorProps, space, SpaceProps, typography, TypographyProps } from 'styled-system'
import { Report } from 'types/Entities'
import { Chart, LineWrapper, ProjectCol, ProjectDetails, ProjectDetailsItem, ProjectSummary, StickyProjectDetailsItem } from './elements'

const Content = styled.section<ColorProps & BorderProps & TypographyProps & {singleCol: boolean}>`
  ${color}
  ${border}
  ${typography}
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  align-content: flex-start;
  width: ${({singleCol}) => singleCol ? '100%' : '58%'};  
  height: auto;
  margin-top: 30px;
  padding: 20px;
`

const ChartColum = styled.section`
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  align-content: flex-start;
  width: 42%;  
  height: auto;
  margin-left: 20px;
`

const ChartSpace = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  align-content: flex-start;
  width: 100%;  
  max-height: 400px;
`

const ContentLayout = styled.div<{singleCol: boolean}>`
  display: flex;
  flex-direction: ${({singleCol}) => singleCol ? 'column' : 'row'};
  justify-items: flex-start;
  align-content: flex-start;
  width: 100%;
  height: auto;
`

const Selection = styled.div<TypographyProps>`
  ${typography}
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  font-weight: 800;
  margin-bottom: 35px;
`

const BubbleText = styled.div<ColorProps & TypographyProps & SpaceProps & BorderProps & { spaceOut?: boolean }>`
  ${color}
  ${space}
  ${border}
  ${typography}
  display: flex;
  justify-content: ${({spaceOut}) => spaceOut ? 'space-evenly' : 'flex-start'};
  align-items: center;
  width: 100%;
  font-weight: ${({spaceOut}) => spaceOut ? 400 : 800};
  margin-top: 30px;
  padding: 20px;
`

const colors = ['#A259FF', '#F24E1E', '#FFC107', '#6497B1']

const ColorBox = styled.div<{ index: number }>`
  display: inline-block;
  width: 17px;
  height: 17px;
  border-radius: 5px;
  background: ${({ index }) => colors[index - 1]}; // the 'all' element is always first but we exclude it so compensate for that with this substraction
  margin-right: 10px;
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const AllProjectsAllGateways = ({project, setOpenItem, total, openItem, reportsByProject, gatewayNamesById}) => {
  return (<LineWrapper>
      <ProjectSummary fontSize={0} borderRadius={1} onClick={() => setOpenItem(project.id)}>
        <p>{project.name}</p>
        <p>TOTAL: {total} USD</p>
      </ProjectSummary>
      {(openItem === project.id) ? <ProjectDetails>
        <StickyProjectDetailsItem>
          <ProjectCol justifyContent='flex-start'>Date</ProjectCol>
          <ProjectCol justifyContent='center'>Gateway</ProjectCol>
          <ProjectCol justifyContent='center'>Transaction ID</ProjectCol>
          <ProjectCol justifyContent='flex-end'>Amount</ProjectCol>
        </StickyProjectDetailsItem>
        {reportsByProject[project.id].map((report: Report) => {
          return (
            <ProjectDetailsItem key={report.transaction}>
              <ProjectCol justifyContent='flex-start'>{formatDate(report.date)}</ProjectCol>
              <ProjectCol justifyContent='center'>{gatewayNamesById[report.gatewayId]}</ProjectCol>
              <ProjectCol justifyContent='center'>{report.transaction}</ProjectCol>
              <ProjectCol justifyContent='flex-end'>{formatNumber(report.amount)} USD</ProjectCol>
            </ProjectDetailsItem>
          )
        })}
      </ProjectDetails> : null}
    </LineWrapper>
  )
}

const AllProjectsSingleGateway = ({project, gateway, setOpenItem, total, openItem, reportsByProject}) => {
  return (<LineWrapper>
    <ProjectSummary fontSize={0} borderRadius={1} onClick={() => setOpenItem(project.id)}>
      <p>{project.name}</p>
      <p>TOTAL: {total} USD</p>
    </ProjectSummary>
    {(openItem === project.id) ? <ProjectDetails>
      <StickyProjectDetailsItem>
        <ProjectCol justifyContent='flex-start'>Date</ProjectCol>
        <ProjectCol justifyContent='center'>Transaction ID</ProjectCol>
        <ProjectCol justifyContent='flex-end'>Amount</ProjectCol>
      </StickyProjectDetailsItem>
      {reportsByProject[project.id].map((report: Report) => {
        if (report.gatewayId !== gateway.id) return null
        return (
          <ProjectDetailsItem key={report.transaction}>
            <ProjectCol justifyContent='flex-start'>{formatDate(report.date)}</ProjectCol>
            <ProjectCol justifyContent='center'>{report.transaction}</ProjectCol>
            <ProjectCol justifyContent='flex-end'>{formatNumber(report.amount)} USD</ProjectCol>
          </ProjectDetailsItem>
        )
      })}
    </ProjectDetails> : null}
  </LineWrapper>)
}

const SingleProjectAllGateways = ({gateway, project, setOpenItem, total, openItem, reportsByGateway}) => {
  return (<LineWrapper>
    <ProjectSummary fontSize={0} borderRadius={1} onClick={() => setOpenItem(gateway.id)}>
      <p>{gateway.name}</p>
      <p>TOTAL: {total} USD</p>
    </ProjectSummary>
    {(openItem === gateway.id) ? <ProjectDetails>
      <StickyProjectDetailsItem>
        <ProjectCol justifyContent='flex-start'>Date</ProjectCol>
        <ProjectCol justifyContent='center'>Transaction ID</ProjectCol>
        <ProjectCol justifyContent='flex-end'>Amount</ProjectCol>
      </StickyProjectDetailsItem>
      {reportsByGateway[gateway.id].map((report: Report) => {
        if (report.projectId !== project.id) return null
        return (
          <ProjectDetailsItem key={report.transaction}>
            <ProjectCol justifyContent='flex-start'>{formatDate(report.date)}</ProjectCol>
            <ProjectCol justifyContent='center'>{report.transaction}</ProjectCol>
            <ProjectCol justifyContent='flex-end'>{formatNumber(report.amount)} USD</ProjectCol>
          </ProjectDetailsItem>
        )
      })}
    </ProjectDetails> : null}
  </LineWrapper>)
}

const SingleProjectSingleGateway = ({gateway, project, reportsByProjectAndGateway}) => {
  return (<LineWrapper>
    <ProjectDetails>
      <StickyProjectDetailsItem>
        <ProjectCol justifyContent='flex-start'>Date</ProjectCol>
        <ProjectCol justifyContent='center'>Transaction ID</ProjectCol>
        <ProjectCol justifyContent='flex-end'>Amount</ProjectCol>
      </StickyProjectDetailsItem>
      {reportsByProjectAndGateway[project.id + gateway.id].map((report: Report) => {
        return (
          <ProjectDetailsItem key={report.transaction}>
            <ProjectCol justifyContent='flex-start'>{formatDate(report.date)}</ProjectCol>
            <ProjectCol justifyContent='center'>{report.transaction}</ProjectCol>
            <ProjectCol justifyContent='flex-end'>{formatNumber(report.amount)} USD</ProjectCol>
          </ProjectDetailsItem>
        )
      })}
    </ProjectDetails>
  </LineWrapper>)
}

export default function ContentComponent() {
  const [openItem, setOpenItem] = useState(null)
  const reportSummariesByProjects = useAppSelector(selectReportSummariesByProject)
  const reportSummariesByGateways = useAppSelector(selectReportSummariesByGateway)
  const reportSummariesByProjectsAndGateways = useAppSelector(selectReportSummariesByProjectAndGateway)
  const reportsByProject = useAppSelector(selectReportsByProject)
  const reportsByGateway = useAppSelector(selectReportsByGateway)
  const reportsByProjectAndGateway = useAppSelector(selectReportsByProjectAndGateway)
  const displayedProject = useAppSelector(selectDisplayedProject)
  const displayedGateway = useAppSelector(selectDispayedGateway)
  const projects = useAppSelector(selectProjects)
  const gateways = useAppSelector(selectGateways)
  const gatewayNamesById = useAppSelector(selectGatewayNamesById)
  const singleCol = (displayedProject.id === 'all' && displayedGateway.id === 'all') || (displayedProject.id !== 'all' && displayedGateway.id !== 'all')

  return displayedProject && displayedGateway ? (
    <ContentLayout singleCol={singleCol}>
      <Content bg='gridBackground' color='regularText' borderRadius={1} singleCol={singleCol}>
        <Selection fontSize={0}>{`${displayedProject.name} | ${displayedGateway.name}`}</Selection>

        {(displayedProject.id === 'all' && displayedGateway.id === 'all' && reportsByProject) ? projects.map((project) => {
          if (project.id === 'all') return null
          
          const total = formatNumber(sumObject(reportSummariesByProjects[project.id]))

          return <AllProjectsAllGateways
            key={project.id}
            project={project}
            setOpenItem={setOpenItem}
            total={total}
            openItem={openItem}
            reportsByProject={reportsByProject}
            gatewayNamesById={gatewayNamesById}
          />
        }) : null}

        {(displayedProject.id === 'all' && displayedGateway.id !== 'all' && reportsByProject) ? projects.map((project) => {
          if (project.id === 'all') return null
          
          const total = formatNumber(sumObject(reportSummariesByProjects[project.id]?.[displayedGateway.id]))

          return typeof total !== 'undefined' ? <AllProjectsSingleGateway
            key={project.id}
            project={project}
            gateway={displayedGateway}
            setOpenItem={setOpenItem}
            total={total}
            openItem={openItem}
            reportsByProject={reportsByProject}
          /> : null
        }) : null}

        {(displayedProject.id !== 'all' && displayedGateway.id === 'all' && reportsByGateway) ? gateways.map((gateway) => {
          if (gateway.id === 'all') return null
          
          const total = formatNumber(sumObject(reportSummariesByGateways[gateway.id]?.[displayedProject.id]))

          return typeof total !== 'undefined' ? <SingleProjectAllGateways
            key={gateway.id}
            gateway={gateway}
            project={displayedProject}
            setOpenItem={setOpenItem}
            total={total}
            openItem={openItem}
            reportsByGateway={reportsByGateway}
          /> : null
        }) : null}

        {(displayedProject.id !== 'all' && displayedGateway.id !== 'all' && reportsByProjectAndGateway[displayedProject.id + displayedGateway.id]) ? <SingleProjectSingleGateway
          project={displayedProject}
          gateway={displayedGateway}
          reportsByProjectAndGateway={reportsByProjectAndGateway}
        /> : null}
        
      </Content>
      {(displayedProject.id === 'all' && displayedGateway.id === 'all')
        ? <BubbleText bg='gridBackground' fontSize={0} borderRadius={1}>{`TOTAL | ${formatNumber(sumObject(reportSummariesByProjects))} USD`}</BubbleText>
        : null  
      }
      {(displayedProject.id !== 'all' && displayedGateway.id !== 'all')
        ? <BubbleText bg='gridBackground' fontSize={0} borderRadius={1}>{`TOTAL | ${formatNumber(reportSummariesByProjectsAndGateways[displayedProject.id + displayedGateway.id])} USD`}</BubbleText>
        : null  
      }
      {(displayedProject.id === 'all' && displayedGateway.id !== 'all')
        ? <ChartColum>
            <BubbleText bg='gridBackground' fontSize={0} borderRadius={1} ml='20px' spaceOut>
            {projects.map((project, index) => {
              return project.id === 'all' ? null : <LegendItem key={project.id}>
                <ColorBox index={index}/>
                <span>{project.name}</span>
              </LegendItem>  
            })}
            </BubbleText>
            <ChartSpace>
              <Chart data={reportSummariesByProjects}/>
            </ChartSpace>
            <BubbleText bg='gridBackground' fontSize={0} borderRadius={1} ml='20px'>
              {`GATEWAY TOTAL | ${formatNumber(sumObject(reportSummariesByGateways[displayedGateway.id]))} USD`}
            </BubbleText>
        </ChartColum>
        : null
      }
      {(displayedProject.id !== 'all' && displayedGateway.id === 'all')
        ? <ChartColum>
            <BubbleText bg='gridBackground' fontSize={0} borderRadius={1} ml='20px' spaceOut>
            {gateways.map((gateway, index) => {
              return gateway.id === 'all' ? null : <LegendItem key={gateway.id}>
                <ColorBox index={index}/>
                <span>{gateway.name}</span>
              </LegendItem>  
            })}
            </BubbleText>
            <ChartSpace>
              <Chart data={reportSummariesByGateways}/>
            </ChartSpace>
            <BubbleText bg='gridBackground' fontSize={0} borderRadius={1} ml='20px'>
              {`PROJECT TOTAL | ${formatNumber(sumObject(reportSummariesByProjects[displayedProject.id]))} USD`}
            </BubbleText>
        </ChartColum>
        : null
      }
    </ContentLayout>
  ) : null
  
}

function formatDate(date) {
  const dateParts = date.split('-')
  return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
}

function formatNumber(number) {
  return Math.round(Number.parseFloat(number)).toLocaleString().replace('\.', ',')
}

function sumObject(obj) {
  if (!obj || typeof obj === 'number') return obj
  return Object.values(obj as {[key: string]: number}).reduce((acc, curr) => acc + sumObject(curr), 0)
}