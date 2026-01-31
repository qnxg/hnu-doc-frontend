import request from "@/src/lib/client"

interface POSTDownloadResponse {
  ticket: string
  zero: number
}

interface GETDownloadRequest {
  ticket: string
  key: string
}

export async function download(id: number) {
  const { ticket, zero } = await request.post<POSTDownloadResponse>("/document/download", { id })

  // TODO(试卷下载): 计算 key
  // ...

  await new Promise(resolve => setTimeout(resolve, zero * 1000))

  const data: GETDownloadRequest = {
    ticket,
    key: ticket,
  }

  return await request.get<string>("/document/download", data)
}
