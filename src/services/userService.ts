import { RequestStatuses } from '../types/RequestStatus';

export interface UsersResponse {
  users?: Array<{ name: string; initials: string }>
  status: RequestStatuses
}

export async function fetchUsers(): Promise<UsersResponse> {
  try {
    const options = {
      method: 'GET',
    }

    const result = await fetch(`/api/users`, options)
    const json = await result.json()

    return {
      users: json.users,
      status: RequestStatuses.SUCCESS,
    }
  } catch (error) {
    console.error('Error fetching users: ', error)
    return {
      status: RequestStatuses.ERROR,
    }
  }
}
