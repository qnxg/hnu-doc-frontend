import type { Document, DocumentType } from "@/src/models/document"
import serverRequest from "@/src/lib/server"

export interface SearchRequest {
  key?: string
  typ: DocumentType[]
  pape_size?: number
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

export interface SearchSubjectRequest {
  name: string
  typ: DocumentType[]
}

export async function search(data: SearchRequest) {
  return await serverRequest.get<SearchResponse>("/search", data)
}

export async function searchSubject(data: SearchSubjectRequest) {
  return await serverRequest.get<Document[]>("/search/subject", data)
}
