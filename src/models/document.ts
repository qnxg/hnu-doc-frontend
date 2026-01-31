/**
 * 文档日期信息
 *
 * @interface DocumentDate
 * @property {"year" | "semester" | "grade"} typ - 日期类型, year: 表示在某一年考试, semester: 表示对应课程属于哪一年, grade: 表示对应哪一级学生
 * @property {number} year - 年份
 */
interface DocumentDate {
  typ: "year" | "semester" | "grade"
  year: number
}

/**
 * 试卷类型
 *
 * @type DocumentType
 * @property {string} final - 期末
 * @property {string} mid - 期中(含机考)
 * @property {string} other - 其他
 */
export type DocumentType = "final" | "mid" | "other"

/**
 * 试卷信息模型
 *
 * @interface Document
 * @property {number} id - 资料id
 * @property {DocumentDate | null} date - 日期信息, null表示未知年份
 * @property {DocumentType} typ - 资料类型
 * @property {string} name - 资料名称, 一般是课程名称
 * @property {boolean} answer - 是否包含答案
 * @property {number} page - 页数
 * @property {string[]} tags - 标签列表
 * @property {string} comment - 说明
 * @property {string} md5 - 文件MD5摘要
 * @property {string[]} categories - 分类列表, 例如 "A1", "A2" 等
 */
export interface Document {
  id: number
  date: DocumentDate | null
  typ: DocumentType
  name: string
  answer: boolean
  page: number
  tags: string[]
  comment: string
  md5: string
  categories: string[]
}
