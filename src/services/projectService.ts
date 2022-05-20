import { Project } from 'types/Entities'
import { RequestStatuses } from '../types/RequestStatus'

export interface ProjectsResponse {
  projects?: Array<Project>
  status: RequestStatuses
}

export async function fetchProjects(): Promise<ProjectsResponse> {
  try {
    const options = {
      method: 'GET',
    }

    const result = await fetch(`/api/projects`, options)
    const json = await result.json()

    return {
      projects: json.projects,
      status: RequestStatuses.SUCCESS,
    }
  } catch (error) {
    console.error('Error fetching projects: ', error)
    return {
      status: RequestStatuses.ERROR,
    }
  }
}
