/**
 * 包含n个 action creator
 * 异步action
 * 同步action
 */
//	引入客户端 io
import io from 'socket.io-client'
import { reqRegister, reqLogin, reqUpdateUser, reqUser, reqUserlist, reqChatMsgList, reqReadMsg } from '../api/index'
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST, RECEIVE_MSG } from './action-types'

/**
 * 单例对象
 * 1.创建对象之前: 判断对象是否已经存在, 只有不存在才去创建
 * 2.创建对象之后: 保存对象
 */
// 1.创建对象之前: 判断对象是否已经存在, 只有不存在才去创建
function initIO(dispatch, userid) {
  if (!io.socket) {
    // 连接服务器, 得到与服务器的连接对象
    io.socket = io('ws://localhost:4000') // 2.创建对象之后: 保存socket对象
    // 客户端接收服务器的数据
    io.socket.on('receiveMsg', function (chatMsg) {
      console.log('客户端接收服务器的数据', chatMsg);
      // 只有当chatMsg是与当前用户相关的消息, 才去分发同步action保存消息
      if (userid === chatMsg.from || userid === chatMsg.to) {
        dispatch(receiveMsg(chatMsg))
      }
    })
  }
}

// 异步获取消息列表数据
async function getMsgList(dispatch, userid) {
  initIO(dispatch, userid)
  const response = await reqChatMsgList()
  const result = response.data
  if (result.code === 0) {
    const { users, chatMsgs } = result.data
    // 分发同步action
    dispatch(receiveMsgList({ users, chatMsgs }))
  }
}

// 发送消息的异步action
export const sendMsg = ({ from, to, content }) => {
  return dispatch => {
    console.log('客户端向服务器发送消息', from, to, content);
    // 发送消息
    io.socket.emit('sendMsg', { from, to, content })
  }
}


// 授权成功的同步action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
// 错误提示信息的同步action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })
// 接收用户的同步action
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user })
// 重置用户的同步action
export const resetUser = (msg) => ({ type: RESET_USER, data: msg })
// 接收用户列表的同步action
const receiveUserList = (userList) => ({ type: RECEIVE_USER_LIST, data: userList })
// 接收消息列表的同步action
const receiveMsgList = ({ users, chatMsgs }) => ({ type: RECEIVE_MSG_LIST, data: { users, chatMsgs } })
// 接收一个消息的同步action
const receiveMsg = (chatMsg) => ({ type: RECEIVE_MSG, data: chatMsg })

// 注册异步action
export const register = (user) => {
  const { username, password, password2 } = user
  // 表单的前台验证, 如果不通过, 分发errMSG的同步action
  if (!username) {
    return errorMsg('用户名必须指定 !')
  } else if (password !== password2) {
    return errorMsg('两次密码要一致 !')
  }
  // 表单数据合法, 返回一个发ajax请求的异步函数
  return async dispatch => {
    // 发送注册的异步ajax请求
    const response = await reqRegister(user)
    const result = response.data
    if (result.code === 0) {
      getMsgList(dispatch, result.data._id)
      // 分发成功的同步action
      dispatch(authSuccess(result.data))
    } else {
      // 分发失败的同步action
      dispatch(errorMsg(result.msg))
    }
  }
}

// 登录异步action
export const login = (user) => {
  const { username, password } = user
  // 表单的前台验证, 如果不通过, 分发errMSG的同步action
  if (!username) {
    return errorMsg('用户名必须指定 !')
  } else if (!password) {
    return errorMsg('密码必须指定 !')
  }
  return async dispatch => {
    // 发送登录的异步ajax请求
    const response = await reqLogin(user)
    const result = response.data
    if (result.code === 0) {
      getMsgList(dispatch, result.data._id)
      // 分发成功的同步action
      dispatch(authSuccess(result.data))
    } else {
      // 分发失败的同步action
      dispatch(errorMsg(result.msg))
    }
  }
}

// 更新用户异步action
export const updateUser = (user) => {
  return async dispatch => {
    const response = await reqUpdateUser(user)
    const result = response.data
    if (result.code === 0) {
      // 更新成功 data
      dispatch(receiveUser(result.data))
    } else {
      // 更新失败 msg
      dispatch(resetUser(result.msg))
    }
  }
}

// 获取用户异步action
export const getUser = () => {
  return async dispatch => {
    const response = await reqUser()
    const result = response.data
    if (result.code === 0) {  //成功
      getMsgList(dispatch, result.data._id)
      dispatch(receiveUser(result.data))
    } else {  // 失败
      dispatch(resetUser(result.msg))
    }
  }
}

// 获取用户列表的异步aciton
export const getUserList = (type) => {
  return async dispatch => {
    const response = await reqUserlist(type)
    const result = response.data
    if (result.code === 0) {
      dispatch(receiveUserList(result.data))
    }
  }
}
