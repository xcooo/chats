/**
 * 男神主界面路由容器组件
 */
import React from 'react'
import { connect } from 'react-redux'
import UserList from '../../components/user-list/user-list'
import { getUserList } from '../../redux/actions'

class Boy extends React.Component {
  componentDidMount() {
    this.props.getUserList('girl')
  }
  render() {
    return (
      <UserList userList={this.props.userList} />
    )
  }
}

export default connect(
  state => ({ userList: state.userList }),
  { getUserList }
)(Boy)