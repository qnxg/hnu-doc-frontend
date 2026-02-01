import type { DocumentType } from "@/src/models/document"
import request from "@/src/lib/client"

export interface SearchRequest {
  key?: string
  typ: DocumentType[]
  page_size?: number
  page?: number
}

/**
 * 科目接口
 *
 * @interface Subject
 * @property {string} name - 科目名称
 * @property {number | null} year - 最新年份
 * @property {number} count - 试卷数量
 */
export interface Subject {
  name: string
  year: number | null
  count: number
}

export interface SearchResponse {
  subjects: Subject[]
  pages: number
}

export async function search(data: SearchRequest) {
  return await request.get<SearchResponse>("/search", data)
}
