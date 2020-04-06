/**
 * 女神信息完善的路由容器组件
 */
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'

import { updateUser } from '../../redux/actions'

class GirlInfo extends React.Component {
  state = {
    header: '', // 头像
    post: '', // 职位
    info: '', // 个人或职位简介
    company: '', // 公司名称
    salary: '', // 工资
  }
  // 设置头像
  setHeader = (header) => {
    this.setState({
      header
    })
  }
  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }
  save = () => {
    this.props.updateUser(this.state)
  }
  render() {
    // 如果信息已经完善, 自动重定向到对应主界面
    const { header, type } = this.props.user
    if (header) {  // 说明消息已经完善
      const path = type === 'girl' ? 'girl' : 'boy'
      return <Redirect to={path} />
    }
    return (
      <div>
        <NavBar style={{ backgroundColor: 'hotpink' }}>女神信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader} />
        <InputItem placeholder="请输入在职职位" onChange={val => { this.handleChange('post', val) }}>在职职位:</InputItem>
        <InputItem placeholder="请输入公司名称" onChange={val => { this.handleChange('company', val) }}>公司名称:</InputItem>
        <InputItem placeholder="请输入职位薪资" onChange={val => { this.handleChange('salary', val) }}>职位薪资:</InputItem>
        <TextareaItem title="爱的宣言" rows={3} onChange={val => { this.handleChange('info', val) }}></TextareaItem>
        <Button style={{ backgroundColor: 'hotpink', color: '#fff' }} onClick={this.save}>保&nbsp;&nbsp;存</Button>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { updateUser }
)(GirlInfo)