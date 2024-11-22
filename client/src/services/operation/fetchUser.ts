import apiRoutes from "../api"
import apiConnector from "../connector"

interface User {
    userId: string
}

const fetchUser = async ({ userId }: User) => {
    const api: string = apiRoutes.getUsersList
    try {
        const response = await apiConnector({ method: 'GET', url: api, params: { userName:userId } })
        console.log(response)
        if (!response.data.success) {
            throw new Error('cannot fetch users')
        }
        return response.data.data
    } catch (err) {
        console.log(err)
    }
}

export default fetchUser