/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { PullToRefresh, SearchBar, Toast, Tabs, Swiper } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep';
import { SwiperRef } from 'antd-mobile/es/components/swiper'
// import io from 'socket.io-client'
import axios from 'axios'
import './shouye.css'
import { addToCart } from '../../redux/action/cart-actions';
import { updateCart } from '../../redux/action/cart-actions';
import { deleteFromCart } from '../../redux/action/cart-actions';
import store from '../../redux/store'


class Shouye extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // socket: io('127.0.0.1:7001'),//配置socket
      userName: '',//进入聊天室之后保存的用户名
      wordList: [],//聊天记录
      activeIndex: 0,
      lunbodata: [],
      tupianArr: [],
      dangji: {}
    }
  }

  componentDidMount() {
    // let { socket, wordList } = this.state;
    // socket.on('connect', (data) => {
    //   console.log(data)
    //   wordList.push(data)
    //   this.setState({ wordList });
    // })
    this.getMessage()
    setTimeout(() => {
      this.setState({
        lunbodata: ['https://static.mcake.com/goods/xingtaochulian/R8006/middle/1.jpg', 'https://static.mcake.com/goods/xingtaochulian/R8006/middle/3.jpg', 'https://static.mcake.com/goods/xingtaochulian/R8006/middle/3.jpg', 'https://static.mcake.com/goods/tianyuanshengridangao/R8005/middle/2.jpg'],
      });
    }, 100);
  }

  getMessage = () => {
    let url = "http://localhost:7001/home"
    let url2 = "http://localhost:7001/dangji"
    axios.post(url, {
      withCredentials: true
    }).then((res) => {
      console.log(res, 'ressss')
      this.setState({ tupianArr: res.data })
    })
    axios.post(url2, {
      withCredentials: true
    }).then((res) => {
      this.setState({ dangji: res.data })
      console.log(this.state.dangji, 'dangjidangjidangji')
    })
  }

  render() {
    const statusRecord = {
      pulling: '用力拉',
      canRelease: '松开吧',
      refreshing: '玩命加载中...',
      complete: '好啦',
    }
    const tabItems = [
      { key: 'one', title: '宠物用品' },
      { key: 'two', title: '预约服务' },
      // { key: 'three', title: '动物' },
    ]

    let { lunbodata } = this.state
    let items = lunbodata.map((color, index) => (
      <Swiper.Item key={index}>
        <div
          className='lunbo'
          style={{ background: color }}
          onClick={() => {
            Toast.show(`你点击了卡片 ${index + 1}`)
          }}
        >
          <img
            style={{ width: '100%' }}
            src={color}
          />
        </div>
      </Swiper.Item>
    ))
    return (
      <>
        <div className='container'>
          <PullToRefresh onRefresh={async () => {
            await sleep(1000);
            // this.setState([...getNextData(), ...this.state]);
          }} renderText={status => {
            return <div>{statusRecord[status]}</div>;
          }}>
            <div className='search'>
              <SearchBar placeholder='请输入内容' showCancelButton />
            </div>
            <div>
              <Tabs
                activeKey={tabItems[this.state.activeIndex].key}
                onChange={key => {
                  const index = tabItems.findIndex(item => item.key === key)
                  this.setState({ activeIndex: index })
                }}
              >
                {tabItems.map(item => (
                  <Tabs.Tab disabled title={item.title} key={item.key} />
                ))}
              </Tabs>
              <Swiper
                direction='horizontal'
                loop
                indicator={() => null}
                defaultIndex={this.state.activeIndex}
                onIndexChange={index => {
                  this.setState({ activeIndex: index })
                }}
              >
                {/* 首页 */}
                <Swiper.Item>
                  <div className='content'>
                    {this.state.lunbodata.length && (
                      <div className='content'>
                        <Swiper autoplay loop>{items}</Swiper>
                      </div>
                    )}
                  </div>
                  <>
                    <div
                      style={{ 
                          marginTop: '10px',
                          marginLeft: '10px',
                          marginRight: '10px',
                          borderRadius: 5,
                          height: "117px",
                          background: `url(${this.state.dangji.imgsrc}) center center `
                          }} >
                      <div style={{
                        width: '30%',
                        height: '100%',
                      }} />
                      <span style={{ position: "relative", left: "30%", width: "40%", top: "-69px", fontSize: "15px" }}>{this.state.dangji?.title}</span>
                    </div>
                    {this.state.tupianArr.map((item, index) => {
                      return (
                        //  console.log({item, index})
                        <div key={index} className='tupian' >
                          <div style={{ border: "1px,black" }}>
                            <img src={item.imgsrc} 
                            style={{
                               height: "30%", 
                               width: "100%", 
                               position: "relative", 
                               zIndex: 10,
                               borderRadius: 10,
                               marginTop: '10px'
                               }} />
                          </div>
                          <div>
                            <span>{item.title}</span>
                            <span>￥{item.price}</span>
                          </div>
                        </div>
                      )
                    })}
                  </>
                </Swiper.Item>



                {/* 预约服务 */}
                <Swiper.Item>
                  <div className='content'>西红柿</div>
                </Swiper.Item>
              </Swiper>
            </div>
          </PullToRefresh>
        </div>
      </>
    )
  }
}
export default Shouye;
