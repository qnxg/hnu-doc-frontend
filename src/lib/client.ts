import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import type { BaseResponse } from "@/src/models/response"
import axios from "axios"
import config from "@/src/lib/config"
import { converter } from "@/src/lib/field-converter"
import { RequestErrorImpl } from "@/src/models/response"

const myAxios = axios.create({
  baseURL: config.BACKEND_URL,
  timeout: 10000,
  withCredentials: true,
})

const clientRequest = {
  request: async <T>(config: AxiosRequestConfig): Promise<T> => (
    myAxios(config)
      .then((axiosResponse: AxiosResponse<BaseResponse<T>>) => {
        const response = axiosResponse.data
        return converter<T>(response.data)
      })
      .catch((error: AxiosError<BaseResponse<T>>) => {
        if (error.response) {
        // 接受到非 200 响应
          const axiosResponse = error.response
          const response = axiosResponse.data
          throw new RequestErrorImpl(
            response.status,
            response.msg,
            error,
          )
        }
        else if (error.request) {
        // 未收到响应
          throw new RequestErrorImpl(
            "NO_RESPONSE",
            error.message,
            error,
          )
        }
        else {
          throw new RequestErrorImpl(
            "REQUEST_SEND_FAILED",
            error.message,
            error,
          )
        }
      })),

  get: async <T>(url: string, data?: object, config?: AxiosRequestConfig) => {
    return await clientRequest.request<T>({ method: "GET", url, params: data, ...config })
  },

  post: async <T>(url: string, data?: object, config?: AxiosRequestConfig) => {
    return await clientRequest.request<T>({ method: "POST", url, data, ...config })
  },

  put: async <T>(url: string, data?: object, config?: AxiosRequestConfig) => {
    return await clientRequest.request<T>({ method: "PUT", url, data, ...config })
  },

  delete: async <T>(url: string, data?: object, config?: AxiosRequestConfig) => {
    return await clientRequest.request<T>({ method: "DELETE", url, data, ...config })
  },
}

export default clientRequest
