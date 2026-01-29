import type { Document } from "@/src/models/document"

/**
 * 试卷集信息模型
 *
 * @interface Collection
 * @property {number} id - 试卷集ID
 * @property {string} name - 试卷集名称
 * @property {string} description - 试卷集描述
 * @property {Document[]} items - 试卷列表
 */
export interface Collection {
  id: number
  name: string
  description: string
  items: Document[]
}
