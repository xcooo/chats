/**
 * 注册路由组件
 */
import React from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button
} from 'antd-mobile'

import Logo from '../../components/logo/logo'
const ListItem = List.Item

export default class Register extends React.Component {
  render() {
    return (
      <div>
        <NavBar>聊&nbsp;天&nbsp;宝</NavBar>
        <Logo />
        <WingBlank>
          <List>
            <InputItem>用户名:</InputItem>
            <InputItem type="password">密&nbsp;&nbsp;&nbsp;码:</InputItem>
          </List>
        </WingBlank>
      </div>
    )
  }
}