import { Report } from 'types/Entities'
import { RequestStatuses } from '../types/RequestStatus'

export interface ReportsResponse {
  reports?: Array<Report>
  status: RequestStatuses
}

export interface FetchReportsParams {
  from?: string
  to?: string
  projectId?: string
  gatewayId?: string
}

export async function fetchReports({
  from = '2021-01-01',
  to = '2021-12-31',
  projectId,
  gatewayId,
}: FetchReportsParams): Promise<ReportsResponse> {
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        from,
        to,
        projectId,
        gatewayId,
      }),
    }

    const result = await fetch(`/api/reports`, options)
    const json = await result.json()

    return {
      reports: json.reports,
      status: RequestStatuses.SUCCESS,
    }
  } catch (error) {
    console.error('Error fetching reports: ', error)
    return {
      status: RequestStatuses.ERROR,
    }
  }
}
