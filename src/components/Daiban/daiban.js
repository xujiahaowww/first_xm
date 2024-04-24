import React, { Component } from 'react'
import { ImageUploader, SearchBar, Toast, PullToRefresh } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep';
// import io from 'socket.io-client'
// import Axios from 'axios'
import './daiban.css'
import { addToCart } from '../../redux/action/cart-actions';
import { updateCart } from '../../redux/action/cart-actions';
import { deleteFromCart } from '../../redux/action/cart-actions';
import store from './store'

class Daiban extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // socket: io('127.0.0.1:7001'),//配置socket
      userName: '',//进入聊天室之后保存的用户名
      wordList: [],//聊天记录
      dbxx: []
    }
  }

  componentDidMount() {
    new Promise(function (resolve, reject) {
      setTimeout(function () {
        store.getChange({
          jgbh: "5101040002",
          jmuserid: "mvUHuxAPoBIgFJSQnGnFaA==",
          page: 1,
          size: 10,
          userid: 13045,
          faxx: [
            {
              czlx: "",
              key: 1,
              zdlx: "",
              zdxx: "",
            }
          ]
        })
        resolve();
      }, 100);
    }).then(
      () => {
        this.setState({ dbxx: store.dbxx })
      }
    )
  }

  render() {
    const statusRecord = {
      pulling: '用力拉',
      canRelease: '松开吧',
      refreshing: '玩命加载中...',
      complete: '好啦',
    }
    return (
      <>
        <div className='container'>
          <PullToRefresh onRefresh={async () => {
            this.getMessage()
            await sleep(1000);
          }} renderText={status => {
            return <div>{statusRecord[status]}</div>;
          }}>
            <div className='search2'>
              <SearchBar placeholder='请输入内容' showCancelButton />
            </div>
            <div
              style={{ height: '20px' }}
            />
            {this.state.dbxx.map((item, index) =>
              <div className='card'>
                {item.xingming}
              </div>)
            }

          </PullToRefresh>
        </div>
      </>
    )
  }
}
export default Daiban;
