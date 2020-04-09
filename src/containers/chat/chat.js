import React from 'react'
import { connect } from 'react-redux'
import { NavBar, List, InputItem, Grid } from 'antd-mobile'
import { sendMsg } from '../../redux/actions'
const Item = List.Item

class Chat extends React.Component {
  state = {
    content: '',
    isShow: false // 是否显示表情列表
  }
  // 在第一次render() 之前回调
  componentWillMount() {
    // 初始化表情列表数据
    const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '😍', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇',
      '🤪', '😝', '🤑', '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇']
    this.emojis = emojis.map(emoji => ({ text: emoji }))
  }

  toggleShow = () => {
    const isShow = !this.state.isShow
    this.setState({ isShow })
    if (isShow) {
      // 异步手动派发resize事件, 解决表情列表显示的bug
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
  }

  handleSend = () => {
    // 收集数据
    const from = this.props.user._id
    const to = this.props.match.params.userid
    const content = this.state.content.trim()
    // 发送请求(发消息)
    if (content) {
      this.props.sendMsg({ from, to, content })
    }
    // 清除输入数据
    this.setState({
      content: '',
      isShow: false
    })
  }
  render() {
    const { user } = this.props
    const { users, chatMsgs } = this.props.chat

    // 计算当前聊天的chatid
    const meId = user._id
    // 如果还没有
    if (!users[meId]) {
      return null
    }
    const targetId = this.props.match.params.userid
    const chatId = [meId, targetId].sort().join('_')

    const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)

    // 得到目标用户的header图片对象
    const targetHeader = users[targetId].header
    const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.png`) : null

    return (
      <div id='chat-page'>
        <NavBar>aa</NavBar>
        <List>
          {
            msgs.map(msg => {
              if (targetId === msg.from) {  // 对方发给我的
                return (
                  <Item
                    key={msg._id}
                    thumb={targetIcon}
                  >
                    {msg.content}
                  </Item>
                )
              } else {  // 我发给对方的
                return (
                  <Item
                    key={msg._id}
                    className='chat-me'
                    extra='我'>
                    {msg.content}
                  </Item>
                )
              }
            })
          }
        </List>
        <div className='am-tab-bar'>
          <InputItem
            placeholder="请输入"
            value={this.state.content}
            onChange={val => this.setState({ content: val })}
            onFocus={() => this.setState({ isShow: false })}
            extra={
              <div>
                <span onClick={this.toggleShow} style={{ marginRight: 5 }}>🙂</span>
                <span onClick={this.handleSend}>发送</span>
              </div>
            }
          />
          {this.state.isShow ? (
            <Grid
              data={this.emojis}
              columnNum={8}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={(item) => {
                // 将表情保存在content中
                this.setState({ content: this.state.content + item.text })
              }}
            />) : null}
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user, chat: state.chat }),
  { sendMsg }
)(Chat)