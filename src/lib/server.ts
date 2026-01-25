import type { AxiosRequestConfig } from "axios"
import { cookies } from "next/headers"
import clientRequest from "./client"

const serverRequest = {
  request: async <T>(config: AxiosRequestConfig): Promise<T> => {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value || ""
    const headers: Record<string, string> = {}
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    return clientRequest.request<T>({ ...config, headers: { ...config.headers, ...headers } })
  },

  get: <T>(url: string, data?: object, config?: AxiosRequestConfig) => {
    return serverRequest.request<T>({ method: "GET", url, params: data, ...config })
  },

  post: <T>(url: string, data?: object, config?: AxiosRequestConfig) => {
    return serverRequest.request<T>({ method: "POST", url, data, ...config })
  },

  put: <T>(url: string, data?: object, config?: AxiosRequestConfig) => {
    return serverRequest.request<T>({ method: "PUT", url, data, ...config })
  },

  delete: <T>(url: string, data?: object, config?: AxiosRequestConfig) => {
    return serverRequest.request<T>({ method: "DELETE", url, data, ...config })
  },
}

export default serverRequest
