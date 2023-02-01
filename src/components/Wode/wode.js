import React, { Component } from 'react'
import { ImageUploader, Badge, Toast, TabBar } from 'antd-mobile'
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'
// import io from 'socket.io-client'
// import Axios from 'axios'
import './wode.css'
import { addToCart } from '../../redux/action/cart-actions';
import { updateCart } from '../../redux/action/cart-actions';
import { deleteFromCart } from '../../redux/action/cart-actions';
import store from '../../redux/store'

class Wode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // socket: io('127.0.0.1:7001'),//配置socket
      userName: '',//进入聊天室之后保存的用户名
      wordList: []//聊天记录
    }
  }

  componentDidMount() {
    // let { socket, wordList } = this.state;
    // socket.on('connect', (data) => {
    //   console.log(data)
    //   wordList.push(data)
    //   this.setState({ wordList });
    // })
  }

  render() {

    return (
      <>
        <div className='container'>
          我的
        </div>
      </>
    )
  }
}
export default Wode;
