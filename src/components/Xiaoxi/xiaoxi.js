import React, { Component } from 'react'
import { List, Input, TextArea, Grid, Form, Popup, Card } from 'antd-mobile'
import moment from 'moment'
// import io from 'socket.io-client'
// import Axios from 'axios'
import './xiaoxi.css'
import styles from './xiaoxi.css'
import Utils from './function'
import { addToCart } from '../../redux/action/cart-actions';
import { updateCart } from '../../redux/action/cart-actions';
import { deleteFromCart } from '../../redux/action/cart-actions';
import store from '../../redux/store'

let userinfo = Utils.lcStorage.getItem('userinfo') || {}
class Xiaoxi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',//进入聊天室之后保存的用户名
      showEmoji: false,
      msg: '',
      chatmsgs: [],//聊天记录
    }
  }
  componentDidMount() {
    // const socket = io('127.0.0.1:3005')
    // socket.on('         ', (data) => {
    //   this.setState({ chatmsgs: data }, () => {
    //     var div = document.getElementById('chat');
    //     console.log(div, 'divvvvv')
    //     div.scrollTop = div.scrollTop + div.scrollHeight;
    //   })
    // })
  }
  fixCarousel() {
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }
  handleSubmit = async () => {
    // const socket = io('127.0.0.1:3005')
    let { chatmsgs } = this.state
    chatmsgs.push({ zhanghao: '13595093807', user: '黄韵柯', avator: 'goushi', msg: this.state.msg, time: moment().format('YYYY-MM-DD HH:mm:ss')})
    // socket.emit('sendmsg', { zhanghao: '13595093807', user: '黄韵柯', avator: 'goushi', msg: this.state.msg, time: moment().format('YYYY-MM-DD HH:mm:ss') })
    await this.setState({ chatmsgs, msg: '', })
    var div = document.getElementById('chat');
    div.scrollTop = div.scrollHeight;
  }
  render() {
    console.log(this.state.chatmsgs,userinfo,'userinfo')
    //添加emoji表情
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
      .split(' ')
      .filter(v => v)
      .map(v => ({ msg: v }))
    return (
      <div id='chat-page'>
        <div className='chat-content' id='chat'>
          {this.state.chatmsgs.length ? this.state.chatmsgs.map(v => {
            //用户头像
            return v.zhanghao !== userinfo.zhanghao ? (
              <>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>{v.time}</div>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                  <img src='' style={{ width: '50px', height: '50px', borderRadius: 30, marginRight: '5px' }} />
                  <span>{v.user}</span>
                  <Card
                    headerStyle={{
                      color: '#1677ff',

                    }}
                    bodyClassName={styles.customBody}
                  >
                    <TextArea
                      value={v.msg}
                      readOnly
                      autoSize={{ maxRows: 15 }}
                      maxLength={500}
                    />
                  </Card>
                </div>
              </>
            ) : (
              <>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>{v.time}</div>
                <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                  <img src='' style={{ width: '50px', height: '50px', borderRadius: 30, marginLeft: '5px' }} />
                  <span>{v.user}</span>
                  <Card
                    headerStyle={{
                      color: '#1677ff',
                    }}
                    bodyClassName={styles.customBody}
                  >
                    <TextArea
                      value={v.msg}
                      readOnly
                      autoSize={{ maxRows: 15 }}
                      maxLength={500}
                    />
                  </Card>
                </div>
              </>
            )
          }) : ''}
        </div>
        {/* 脚部输入框 */}
        <div className="stick-footer">
          <Form layout='horizontal'>
            <Form.Item
              extra={
                <div>
                  <span
                    style={{ marginRight: 15 }}
                    onClick={() => {
                      this.setState({
                        showEmoji: !this.state.showEmoji
                      })
                      this.fixCarousel()
                    }}
                  >😃</span>
                  <span onClick={() => this.handleSubmit()}>发送</span>
                </div>
              }
            >
              <Input
                placeholder='请输入'
                value={this.state.msg}
                onChange={v => {
                  this.setState({ msg: v })
                }} />
            </Form.Item>
          </Form>
          <Popup
            visible={this.state.showEmoji}
            onMaskClick={() => {
              this.setState({ showEmoji: false })
            }}
          >
            <div
              style={{ height: '40vh', overflowY: 'scroll', padding: '20px' }}
            >
              <Grid columns={4} gap={8}>
                {emoji.map(item => {
                  return (
                    <Grid.Item>
                      <div
                        style={{ textAlign: 'center' }}
                        onClick={el => {
                          this.setState({
                            msg: this.state.msg + el.target.innerHTML,
                            showEmoji: false
                          })
                        }}
                      >{item.msg}</div>
                    </Grid.Item>
                  )
                })}
              </Grid>
            </div>
          </Popup>
        </div>
      </div>
    )
  }
}
export default Xiaoxi;
