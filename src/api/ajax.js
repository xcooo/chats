/**
 * 能够发送ajax请求的函数模块, 函数的返回值是 promise对象
 */
import axios from 'axios'

export default function ajax(url, data = {}, type = 'GET') {
  if (type === 'GET') {
    // 拼接请求参数
    // data: {uaername: tom, password:123}
    // paramsStr: username=tom&password=123
    let paramStr = ''
    Object.keys(data).forEach(key => {
      paramStr += key + '=' + data[key] + '&'
    })
    if (paramStr) {
      paramStr = paramStr.substring(0, paramStr.length - 1)
    }
    // 发送get请求 
    return axios.get(url + '?' + paramStr)
  } else {
    // 发送post请求
    return axios.post(url, data)
  }
}