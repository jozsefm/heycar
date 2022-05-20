import { BASE_URL } from 'constants/baseUrl'
import type { NextApiHandler } from 'next'

const getSongsByBPMHandler: NextApiHandler = async (request, response) => {
  try {
    const options = {
      method: 'GET',
    }

    const result = await fetch(`${BASE_URL}/projects`, options)
    const json = await result.json()

    return response.status(200).json({
      projects: json.data.map(
        ({ name, projectId, gatewayIds }: { name: string; projectId: string; gatewayIds: string[] }) => ({
          name,
          id: projectId,
          gatewayIds,
        }),
      ),
    })
  } catch (error) {
    console.error('Error fetching projects on backend: ', error)
    return response.status(500).end()
  }
}

export default getSongsByBPMHandler
