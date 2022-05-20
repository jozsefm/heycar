import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from 'app/store'
import { fetchGateways, GatewaysResponse } from 'services/gatewayService'
import { fetchProjects, ProjectsResponse } from 'services/projectService'
import { fetchReports, FetchReportsParams, ReportsResponse } from 'services/reportsService'
import { Gateway, Project, Report } from 'types/Entities'
import { RequestStatuses } from 'types/RequestStatus'

export interface DataState {
  projects: Project[]
  selectedProject: Project | null
  displayedProject: Project | null
  gateways: Gateway[]
  selectedGateway: Gateway | null
  displayedGateway: Gateway | null
  reports: Report[]
  fetchStatus: RequestStatuses
}

const initialState: DataState = {
  projects: [
    {
      name: 'All projects',
      gatewayIds: [],
      id: 'all',
    },
  ],
  selectedProject: null,
  displayedProject: null,
  gateways: [
    {
      id: 'all',
      name: 'All gateways',
      type: '',
    },
  ],
  selectedGateway: null,
  displayedGateway: null,
  reports: [],
  fetchStatus: RequestStatuses.INITIAL,
}

export const getProjects = createAsyncThunk('data/getProjects', async () => await fetchProjects())

export const getGateways = createAsyncThunk('data/getGateways', async () => await fetchGateways())

export const getReports = createAsyncThunk(
  'data/getReports',
  async ({ from, to, projectId, gatewayId }: FetchReportsParams) =>
    await fetchReports({ from, to, projectId, gatewayId }),
)

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setSelectedProject: (state, { payload }: PayloadAction<Project>) => {
      state.selectedProject = payload
    },
    setSelectedGateway: (state, { payload }: PayloadAction<Gateway>) => {
      state.selectedGateway = payload
    },
    setDisplayedProject: (state, { payload }: PayloadAction<Project>) => {
      state.displayedProject = payload
    },
    setDisplayedGateway: (state, { payload }: PayloadAction<Gateway>) => {
      state.displayedGateway = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.fetchStatus = RequestStatuses.LOADING
      })
      .addCase(getProjects.fulfilled, (state, action: PayloadAction<ProjectsResponse>) => {
        const { status, projects } = action.payload
        if (projects) {
          state.projects = [...state.projects, ...projects]
        }
        state.fetchStatus = status
      })
      .addCase(getGateways.pending, (state) => {
        state.fetchStatus = RequestStatuses.LOADING
      })
      .addCase(getGateways.fulfilled, (state, action: PayloadAction<GatewaysResponse>) => {
        const { status, gateways } = action.payload
        if (gateways) {
          state.gateways = [...state.gateways, ...gateways]
        }
        state.fetchStatus = status
      })
      .addCase(getReports.pending, (state) => {
        state.fetchStatus = RequestStatuses.LOADING
      })
      .addCase(getReports.fulfilled, (state, action: PayloadAction<ReportsResponse>) => {
        const { status, reports } = action.payload
        if (reports) {
          state.reports = reports
        }
        state.fetchStatus = status
      })
  },
})

export const { setSelectedProject, setSelectedGateway, setDisplayedProject, setDisplayedGateway } = dataSlice.actions

export const selectProjects = (state: AppState) => state.data.projects
export const selectCurrentProject = (state: AppState) => state.data.selectedProject
export const selectDisplayedProject = (state: AppState) => state.data.displayedProject
export const selectGateways = (state: AppState) => state.data.gateways
export const selectCurrentGateway = (state: AppState) => state.data.selectedGateway
export const selectDispayedGateway = (state: AppState) => state.data.displayedGateway
export const selectReports = (state: AppState) => state.data.reports
export const selectReportSummariesByProject = (state: AppState) => {
  return state.data.reports.reduce((acc, report) => {
    if (!acc[report.projectId]) {
      acc[report.projectId] = { [report.gatewayId]: report.amount }
    } else {
      if (!acc[report.projectId][report.gatewayId]) {
        acc[report.projectId][report.gatewayId] = report.amount
      } else {
        const amount = acc[report.projectId][report.gatewayId]
        acc[report.projectId][report.gatewayId] = amount + report.amount
      }
    }
    return acc
  }, {})
}
export const selectReportSummariesByGateway = (state: AppState) => {
  return state.data.reports.reduce((acc, report) => {
    if (!acc[report.gatewayId]) {
      acc[report.gatewayId] = { [report.projectId]: report.amount }
    } else {
      if (!acc[report.gatewayId][report.projectId]) {
        acc[report.gatewayId][report.projectId] = report.amount
      } else {
        const amount = acc[report.gatewayId][report.projectId]
        acc[report.gatewayId][report.projectId] = amount + report.amount
      }
    }
    return acc
  }, {})
}
export const selectReportSummariesByProjectAndGateway = (state: AppState) => {
  return state.data.reports.reduce((acc, report) => {
    if (!acc[report.projectId + report.gatewayId]) {
      acc[report.projectId + report.gatewayId] = report.amount
    } else {
      acc[report.projectId + report.gatewayId] += report.amount
    }
    return acc
  }, {})
}
export const selectReportsByProject = (state: AppState) => {
  return state.data.reports.reduce((acc, report) => {
    if (!acc[report.projectId]) {
      acc[report.projectId] = [report]
    } else {
      acc[report.projectId].push(report)
    }
    return acc
  }, {})
}
export const selectReportsByGateway = (state: AppState) => {
  return state.data.reports.reduce((acc, report) => {
    if (!acc[report.gatewayId]) {
      acc[report.gatewayId] = [report]
    } else {
      acc[report.gatewayId].push(report)
    }
    return acc
  }, {})
}
export const selectReportsByProjectAndGateway = (state: AppState) => {
  return state.data.reports.reduce((acc, report) => {
    if (!acc[report.projectId + report.gatewayId]) {
      acc[report.projectId + report.gatewayId] = [report]
    } else {
      acc[report.projectId + report.gatewayId].push(report)
    }
    return acc
  }, {})
}
export const selectGatewayNamesById = (state: AppState) => {
  return state.data.gateways.reduce((acc, gateway) => {
    acc[gateway.id] = gateway.name
    return acc
  }, {})
}
export const selectFetchStatus = (state: AppState) => state.data.fetchStatus

export default dataSlice.reducer
