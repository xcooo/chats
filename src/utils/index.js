/**
 * 包含n个工具函数的模块
 * 
 * 用户主界面路由
 * boy: /boy
 * girl: /girl
 * 
 * 用户信息完善界面路由
 * boy: /boyinfo
 * girl: /girlinfo
 * 
 * 判断是否已经完善信息? user.header 是否有值
 * 判断用户类型: user.type
 */

// 获取对应的路由
export function getRedirectTo(type, header) {
  let path
  if (type === 'boy') {
    path = '/boy'
  } else {
    path = '/girl'
  }
  // 判断header
  if (!header) {
    // 如果没有header, 返回信息完善界面的path
    path += 'info'
  }
  return path
}