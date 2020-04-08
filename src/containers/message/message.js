/**
 * 消息主界面路由容器组件
 */
import React from 'react'
import { connect } from 'react-redux'

class Message extends React.Component {
  render() {
    return (
      <div>Message</div>
    )
  }
}

export default connect(
  state => ({}),
  {}
)(Message)