/**
 * 主界面路由组件
 */
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'  // 可以操作前端cookie的对象 set()/remove()/get()

import BoyInfo from '../boy-info/boy-info'
import GirlInfo from '../girl-info/girl-info'
import Girl from '../girl/girl'
import Boy from '../boy/boy'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import { NavBar } from 'antd-mobile'
import NavFooter from '../../components/nav-footer/nav-footer'

import { getRedirectTo } from '../../utils'
import { getUser } from '../../redux/actions'

class Main extends React.Component {
  // 给组件对象添加属性
  navList = [ // 包含所有导航组件的相关信息数据
    {
      path: '/girl', // 路由路径
      component: Girl,
      title: '男神列表',
      icon: 'dashen',
      text: '男神',
    },
    {
      path: '/boy', // 路由路径
      component: Boy,
      title: '女神列表',
      icon: 'laoban',
      text: '女神',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ]

  componentDidMount() {
    // 之前登录过(cookie中有userid), 但还没有登录(redux管理的user中没有_id), 发请求获取对应的user
    const userid = Cookies.get('userid')
    const { _id } = this.props.user
    if (userid && !_id) {
      // 发送异步请求, 获取user
      // console.log('发送ajax请求');
      this.props.getUser()
    }
  }
  render() {
    // 读取cookie中的userid
    const userid = Cookies.get('userid')
    // 如果没有, 自动重定向到登录界面
    if (!userid) {
      return <Redirect to='/login' />
    }
    // 如果有, 读取redux中的user状态
    const { user } = this.props
    // 如果redux中的user没有_id, 返回null(不做任何显示)   不能返回到login界面, 否则实现不了自动登录功能
    // debugger
    if (!user._id) {
      return null
    } else {
      // 如果有_id, 显示对应的界面
      // 如果请求根路径, 根据user的type和header来计算出一个重定向的路由路径, 并自动重定向
      let path = this.props.location.pathname
      if (path === '/') {
        path = getRedirectTo(user.type, user.header)
        return <Redirect to={path} />
      }
    }
    const { navList } = this
    const path = this.props.location.pathname
    const currentNav = navList.find(nav => nav.path === path)

    if(currentNav) {
      if(user.type === 'girl') {
        // 隐藏数组的第二项
        navList[1].hide = true
      }else {
        // 隐藏数组的第一项
        navList[0].hide = true
      }
    }

    return (
      <div>
        {/* 动态生成路由 */}
        {currentNav ? <NavBar className='sticky-header' >{currentNav.title}</NavBar> : null}
        <Switch>
          {
            navList.map(nav => <Route path={nav.path} component={nav.component} key={nav.path} />)
          }
          <Route path="/girlInfo" component={GirlInfo} />
          <Route path="/boyInfo" component={BoyInfo} />
          <Route component={NotFound} />
        </Switch>
        {currentNav ? <NavFooter navList={navList} />: null}
      </div>
    )
  }
}
export default connect(
  state => ({ user: state.user }),
  { getUser }
)(Main)


/**
如何实现自动登录(关闭浏览器, 再打开, 无需再次输入账号密码, 完成自动登录):

1.过程分析:
	关闭浏览器, 再打开, 唯一有的数据只有cookie, redux中的user是没有的, 所以需要在生命周期函数中 (根据cookie中的userid) 先获取user信息,判断用户类型(男神或者女神), 根据user的type和header计算路由跳转, 这些带有权限的功能都需要放在main组件

2.实现流程
   1.componentDidMount()
     1). 之前登录过(cookie中有userid), 但还没有登录(redux管理的user中没有_id), 发请求获取对应的user
   2.render()
     1). 如果cookie中没有userid, 直接重定向到login
     2). 判断redux管理的user 中是否有 _id, 如果没有, 暂时不做任何显示  ( 不能跳转到login界面, 否则实现不了自动登录功能, 需要在生命周期函数请求user)
     3). 如果有, 说明当前已经登录, 显示对应的界面
     4). 如果请求根路径: 根据user的type和header来计算出一个重定向的路由路径, 并自动重定向
 */