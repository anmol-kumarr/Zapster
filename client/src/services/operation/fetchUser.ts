import { Dispatch, SetStateAction } from "react"
import apiRoutes from "../api"
import apiConnector from "../connector"
import { SearchProps } from "../../components/chats/searchBar"

interface User {
    userId: string,
    setSearchResponse: Dispatch<SetStateAction<SearchProps[]>>
}

const fetchUser = async ({ userId, setSearchResponse }: User) => {
    const api: string = apiRoutes.getUsersList
    try {
        const response = await apiConnector({ method: 'GET', url: api, params: { userName: userId } })
        console.log(response)
        if (!response.data.success) {
            throw new Error('cannot fetch users')
        }
        setSearchResponse(response?.data?.data)
        return response.data.data
    } catch (err) {
        console.log(err)
    }
}

export default fetchUser