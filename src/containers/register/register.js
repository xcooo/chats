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

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/actions'

import Logo from '../../components/logo/logo'
const ListItem = List.Item

class Register extends React.Component {
  state = {
    username: '', // 用户名
    password: '', // 密码
    password2: '', // 确认密码
    type: 'boy'   // 用户类型名称  boy/girl
  }
  // 点击注册调用
  register = () => {
    // console.log(this.state);
    this.props.register(this.state)
  }
  // 处理输入数据的改变: 更新对应的状态
  handleChange = (name, val) => {
    this.setState({
      [name]: val  // 属性名不是name, 而是name变量的值
    })
  }
  toLogin = () => {
    this.props.history.replace('/login')
  }
  render() {
    const { type } = this.state
    const { msg, redirectTo } = this.props.user
    // 如果redirectTo有值, 需要重定向到指定的路由
    if (redirectTo) {
      return <Redirect to={redirectTo}/>
    }
    return (
      <div>
        <NavBar>聊&nbsp;天&nbsp;宝</NavBar>
        <Logo />
        <WingBlank>
          <List>
            {msg ? <div className="error-msg">{msg}</div> : null}
            <WhiteSpace />
            <InputItem placeholder='请输入用户名' onChange={val => { this.handleChange('username', val) }}>用户名:</InputItem>
            <WhiteSpace />
            <InputItem placeholder='请输入密码' type="password" onChange={val => { this.handleChange('password', val) }}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
            <InputItem placeholder='重复密码' type="password" onChange={val => { this.handleChange('password2', val) }}>确认密码:</InputItem>
            <WhiteSpace />
            <ListItem>
              <span>用户类型:</span>
              &nbsp;&nbsp;&nbsp;
              <Radio checked={type === 'boy'} onChange={() => this.handleChange('type', 'boy')}>男神</Radio>
              &nbsp;&nbsp;&nbsp;
              <Radio checked={type === 'girl'} onChange={() => this.handleChange('type', 'girl')}>女神</Radio>
            </ListItem>
            <WhiteSpace />
            <Button type="primary" onClick={this.register}>注册</Button>
            <WhiteSpace />
            <Button onClick={this.toLogin}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { register }
)(Register)