/**
 * 主界面路由组件
 */
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import BoyInfo from '../boy-info/boy-info'
import GirlInfo from '../girl-info/girl-info'

class Main extends React.Component {
  render() {
    // 检查用户是否登录, 如果没有, 自动重定向到登录页面
    const { user } = this.props
    if (!user._id) {
      return <Redirect to='/login' />
    }
    return (
      <div>
        <Switch>
          <Route path="/girlInfo" component={GirlInfo} />
          <Route path="/boyInfo" component={BoyInfo} />
        </Switch>
      </div>
    )
  }
}
export default connect(
  state => ({ user: state.user })
)(Main)