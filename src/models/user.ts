/**
 * 用户信息模型
 *
 * @interface UserInfo
 * @property {string} stuID - 学号
 * @property {string} name - 姓名
 * @property {string[]} permissions - 权限
 */
export interface UserInfo {
  stuID: string
  name: string
  permissions: string[]
}
