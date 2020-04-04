/**
 * 登录路由组件
 */
import React from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile'

import Logo from '../../components/logo/logo'
const ListItem = List.Item

export default class Login extends React.Component {
  state = {
    username: '', // 用户名
    password: '' // 密码
  }
  login = () => {
    console.log(this.state);
    
  }
  // 处理输入数据的改变: 更新对应的状态
  handleChange = (name, val) => {
    this.setState({
      [name]: val  // 属性名不是name, 而是name变量的值
    })
  }
  toRegister = () => {
    this.props.history.replace('/register')
  }
  render() {
    return (
      <div>
        <NavBar>聊&nbsp;天&nbsp;宝</NavBar>
        <Logo />
        <WingBlank>
          <List>
            <WhiteSpace />
            <InputItem placeholder='请输入用户名' onChange={val => {this.handleChange('username', val)}}>用户名:</InputItem>
            <WhiteSpace />
            <InputItem placeholder='请输入密码' type="password" onChange={val => {this.handleChange('password', val)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
            <WhiteSpace />
          
            <Button type="primary" onClick={this.login}>登录</Button>
            <WhiteSpace />
            <Button onClick={this.toRegister}>还没有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}