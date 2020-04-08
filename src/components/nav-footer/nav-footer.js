import React from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const Item = TabBar.Item

// 希望在非路由组件中使用路由库的api
// withRoute()
class NavFooter extends React.Component {
  static propTypes = {
    navList: PropTypes.array.isRequired
  }
  render() {
    let { navList } = this.props
    navList = navList.filter(nav => !nav.hide)
    const pathname = this.props.location.pathname
    return (
      <TabBar>
        {
          navList.map(nav => (
            <Item key={nav.path}
              title={nav.text}
              icon={{ uri: require(`./images/${nav.icon}.png`) }}
              selectedIcon={{ uri: require(`./images/${nav.icon}-selected.png`) }}
              selected={pathname === nav.path}
              onPress={() => {
                this.props.history.replace(nav.path)
              }}
            ></Item>
          ))
        }
      </TabBar>
    )
  }
}

// 向外暴露 withRouter 包装产生的组件
// 内部向组件中传入一些路由组件特有的属性: history/location/match
export default withRouter(NavFooter) 