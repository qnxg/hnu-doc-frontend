import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import axios from "axios"
import config from "@/src/lib/config"

/**
 * 默认响应接口
 *
 * @template T - 响应数据的类型
 * @property {string} status - 请求状态, 成功为 "OK", 失败为对应错误代码
 * @property {T} data - 负载数据
 * @property {string} msg - 错误信息文本
 */
export interface Response<T> {
  status: string
  data: T
  msg: string
}

export interface RequestError {
  status: string
  msg: string
  originalError?: AxiosError
}

class RequestErrorImpl extends Error implements RequestError {
  constructor(
    public status: string,
    public msg: string,
    public originalError?: AxiosError,
  ) {
    super(msg)
    this.name = "RequestError"
  }
}

const myAxios = axios.create({
  baseURL: config.BACKEND_URL,
  timeout: 10000,
  withCredentials: true,
})

const clientRequest = {
  request: async <T>(config: AxiosRequestConfig): Promise<T> => (
    myAxios(config)
      .then((axiosResponse: AxiosResponse<Response<T>>) => {
        const response = axiosResponse.data
        return response.data
      })
      .catch((error: AxiosError<Response<T>>) => {
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
