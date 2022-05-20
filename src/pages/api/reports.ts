import { BASE_URL } from 'constants/baseUrl'
import type { NextApiHandler } from 'next'

const getReportsHandler: NextApiHandler = async (request, response) => {
  try {
    const { from, to, projectId, gatewayId } = JSON.parse(request.body)

    const body = JSON.stringify({
      from,
      to,
      projectId,
      gatewayId,
    })

    const options: RequestInit = {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': `${body.length}`,
      },
    }

    const result = await fetch(`${BASE_URL}/report`, options)

    const json = await result.json()

    return response.status(200).json({
      reports: json.data.map(
        ({
          amount,
          modified,
          gatewayId,
          projectId,
          paymentId
        }: {
          amount: number
          modified: string
          gatewayId: string
          projectId: string
          paymentId: string
        }) => ({
          amount,
          date: modified,
          gatewayId,
          projectId,
          transaction: paymentId
        }),
      ),
    })
  } catch (error) {
    console.error('Error fetching reports on backend: ', error)
    return response.status(500).end()
  }
}

export default getReportsHandler
