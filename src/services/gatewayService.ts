import { Gateway } from 'types/Entities'
import { RequestStatuses } from '../types/RequestStatus'

export interface GatewaysResponse {
  gateways?: Array<Gateway>
  status: RequestStatuses
}

export async function fetchGateways(): Promise<GatewaysResponse> {
  try {
    const options = {
      method: 'GET',
    }

    const result = await fetch(`/api/gateways`, options)
    const json = await result.json()

    return {
      gateways: json.gateways,
      status: RequestStatuses.SUCCESS,
    }
  } catch (error) {
    console.error('Error fetching gateways: ', error)
    return {
      status: RequestStatuses.ERROR,
    }
  }
}
