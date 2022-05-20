import { BASE_URL } from 'constants/baseUrl'
import type { NextApiHandler } from 'next'

const getUsersHandler: NextApiHandler = async (request, response) => {
  try {
    const options = {
      method: 'GET',
    }

    const result = await fetch(`${BASE_URL}/users`, options)
    const json = await result.json()

    return response.status(200).json({
      users: json.data.map(({ firstName, lastName }: { firstName: string; lastName: string }) => ({
        name: `${firstName} ${lastName}`,
        initials: firstName.charAt(0) + lastName.charAt(0),
      })),
    })
  } catch (error) {
    console.error('Error fetching users on backend: ', error)
    return response.status(500).end()
  }
}

export default getUsersHandler
