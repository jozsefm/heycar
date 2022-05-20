import { BASE_URL } from 'constants/baseUrl'
import type { NextApiHandler } from 'next'

const getGatewaysHandler: NextApiHandler = async (request, response) => {
  try {
    const options = {
      method: 'GET',
    }

    const result = await fetch(`${BASE_URL}/gateways`, options)
    const json = await result.json()

    return response.status(200).json({
      gateways: json.data.map(({ gatewayId, name, type }: { gatewayId: string; name: string; type: string }) => ({
        id: gatewayId,
        name,
        type,
      })),
    })
  } catch (error) {
    console.error('Error fetching gateways on backend: ', error)
    return response.status(500).end()
  }
}

export default getGatewaysHandler
