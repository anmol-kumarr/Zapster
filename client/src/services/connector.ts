import axios, { AxiosResponse } from 'axios'

interface ApiConnectorInterface {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    url: string;
    bodyData?: any;
    header?: AxiosRequestHeaders;
    params?: Record<string, any>;
}

export const axiosInstance = axios.create({})

const apiConnector = ({ method, url, bodyData, header, params }: ApiConnectorInterface): Promise<AxiosResponse> => {
    return axiosInstance({
        method: method,
        url: url,
        data: bodyData || null,
        headers: header || null,
        params: params || null,
        withCredentials: true
    })
}

export default apiConnector