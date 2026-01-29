/**
 * 审核中的文档模型
 *
 * @interface PendingDocument
 * @property {number} id - 资料id
 * @property {Document} item - 实际文档
 * @property {"pending" | "accepted" | "rejected"} status - 审核状态，pending: 审核中，accepted: 已通过，rejected: 已拒绝
 * @property {string} stuID - 提交者学号
 * @property {string} comment - 审核意见，当审核不通过时该字段存在，表示不通过的原因
 * @property {string} createTime - 上传时间
 * @property {string} updateTime - 更新时间，一般是审核状态更改之后才会更新
 * @property {number} target - 对应的资料库里的试卷id，批准且系统将试卷处理完毕之后，将会把该试卷添加到正式的资料库中，然后设置该字段
 */
export interface PendingDocument {
  id: number
  item: Document
  status: "pending" | "accepted" | "rejected"
  stuID: string
  comment: string
  createTime: string
  updateTime: string
  target: number
}
