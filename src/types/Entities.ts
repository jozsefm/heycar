export interface Project {
  name: string
  id: string
  gatewayIds: string[]
}

export interface Gateway {
  id: string
  name: string
  type: string
}

export interface Report {
  amount: number
  date: string
  gatewayId: string
  projectId: string
  transaction: string
}
