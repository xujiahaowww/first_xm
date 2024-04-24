/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import ReactDom from 'react-dom'
import { toJS } from 'mobx'
import { PullToRefresh, SearchBar, Toast, Tabs, Swiper, Popup, DotLoading } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep';
import { SwiperRef } from 'antd-mobile/es/components/swiper'
import Detail from './detail'
import "video-react/dist/video-react.css"
import Utils from '../Login/function'
import { Player, ControlBar } from 'video-react'
import YyCalendar from './yyCalender'
// import io from 'socket.io-client'
import axios from 'axios'
import './shouye.css'
import { addToCart } from '../../redux/action/cart-actions';
import { updateCart } from '../../redux/action/cart-actions';
import { deleteFromCart } from '../../redux/action/cart-actions';
import store from './store'

let cdPage = 1
let cdSize = 10

@observer
class Shouye extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      // socket: io('127.0.0.1:7001'),//配置socket
      userName: '',//进入聊天室之后保存的用户名
      wordList: [],//聊天记录
      activeIndex: 0,
      lunbodata: [],
      tupianArr: [],
      dangji: {},
      scrollTop: false
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
      window.addEventListener('scroll', this.handleScroll, true)
      this.setState({
        lunbodata: ['https://static.mcake.com/goods/xingtaochulian/R8006/middle/1.jpg', 'https://static.mcake.com/goods/xingtaochulian/R8006/middle/3.jpg', 'https://static.mcake.com/goods/xingtaochulian/R8006/middle/3.jpg', 'https://static.mcake.com/goods/tianyuanshengridangao/R8005/middle/2.jpg'],
      });
    }, 100);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, true);
  }
  handleScroll = () => {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    if (1200 < Math.ceil(scrollTop) && Math.ceil(scrollTop) < 1300) {
      this.setState({ scrollTop: true })
    } else if (1200 > Math.ceil(scrollTop)) {
      this.setState({ scrollTop: false })
    }
    if (Math.ceil(scrollTop) + windowHeight >= scrollHeight) {
      //考虑到滚动的位置一般可能会大于一点可滚动的高度，所以这里不能用等于
      this.Fn()
    }
  }
  function = () => {
    console.log(222222)
    cdPage += 1
    this.getMessage()
  }
  Fn = Utils.throttle(this.function, 3000)
  getMessage = () => {
    Toast.show({
      icon: 'loading',
      content: '加载中…',
    })
    let sjCl = () => {
      if (cdPage === 1) {
        this.setState({ tupianArr: store.zyxx, dangji: store.zyxx[0] }, () => {
        })
      } else {
        let { tupianArr } = this.state
        let newtupianArr = tupianArr.concat(store.zyxx)
        this.setState({ tupianArr: newtupianArr })
      }
      Toast.clear()
    }
    new Promise(function (resolve, reject) {
      setTimeout(function () {
        store.getChange({
          id: 8666,
          mc: '',
          product_id: "5101040002",
          page: cdPage,
          size: cdSize,
        })
        resolve();
      }, 100);
    }).then(
      function () {
        setTimeout(function () {
          sjCl()
        }, 2000);
      }
    )
  }

  xiangQing = (item, index) => {
    console.log(item, index)
    this.setState({ xqvisibe: true, xqitem: item })
  }
  // 滚动监听
  scrollListener = event => {
    let height1 = this.myRef.current.clientHeight  // 可以得到我们设置的高度 (不包括滚动的高度)
    let height2 = this.myRef.current.scrollTop  // 当滚动时被卷去的高度
    let height3 = this.myRef.current.scrollHeight  // 全部的高度 包括滚动的高度
    console.log(height1, height2, height3)
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
        <div className='container'
        >
          <PullToRefresh onRefresh={async () => {
            cdPage = 1
            this.getMessage()
            await sleep(1000);
          }} renderText={status => {
            return <div>{statusRecord[status]}</div>;
          }}>
            <div className='search1'>
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
                  if (index === 1) {
                    window.removeEventListener('scroll', this.handleScroll, true);
                    document.getElementsByClassName('adm-swiper-track-inner')[0].style.height
                      = window.screen.availHeight + "px"
                  } else {
                    window.addEventListener('scroll', this.handleScroll, true)
                    document.getElementsByClassName('adm-swiper-track-inner')[0].style.height
                      = ''
                  }
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
                        background: `url(${this.state.dangji?.headphoto}) center center `
                      }} >
                      <div style={{
                        width: '30%',
                        height: '100%',
                      }} />
                      <span style={{ position: "relative", left: "30%", width: "40%", top: "-69px", fontSize: "15px" }}>{this.state.dangji?.xingming}</span>
                    </div>
                    {this.state.tupianArr.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className='tupian' >
                          <div
                            style={{ border: "1px,black" }}
                            onClick={() => {
                              this.xiangQing(item, index)
                            }}
                          >
                            <img src={item.headphoto || 'https://static.mcake.com/goods/tianyuanshengridangao/R8005/middle/2.jpg'}
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
                            <span>{item.xingming}</span>
                            <span>￥{item.id}</span>
                          </div>
                        </div>
                      )
                    })}
                  </>
                  <Popup
                    // position='right'
                    visible={this.state.xqvisibe}
                    onClose={() => {
                      this.setState({ xqvisibe: false })
                    }}
                    onMaskClick={() => {
                      this.setState({ xqvisibe: false })
                    }}
                    showCloseButton
                    bodyStyle={{ width: '100vw', height: '60vh' }}
                  >
                    {this.state.xqvisibe && (
                      <div style={{ overflowY: 'scroll', height: '60vh' }}>
                        <Detail message={this.state.xqitem} />
                      </div>
                    )}
                  </Popup>
                </Swiper.Item>

                {/* 预约服务 */}
                <Swiper.Item>
                  <div className='yuyuecontent'>
                    <div className='yuyuetop'>

                    </div>
                    <div className='yuyuedate'>
                      <YyCalendar

                      />
                    </div>
                  </div>
                </Swiper.Item>
              </Swiper>
            </div>
          </PullToRefresh>

          {this.state.scrollTop && (
            <div className="to_top" ref={this.myRef} onClick={() => {
              const getTargetDOM = ReactDom.findDOMNode(this.myRef.current);
              console.log(window.pageYOffset, 'getTargetDOMgetTargetDOM')
              let scrollTop = window.pageYOffset;
              // 每0.01秒向上移动100像素，直到小于或等于0结束
              let timer = setInterval(() => {
                scrollTop -= 100;
                // 为负数，浏览器会不处理得
                window.scrollTo(0, scrollTop);
                if (scrollTop <= 0) {
                  clearInterval(timer)
                }
              }, 10)
              // document.documentElement.scrollTop = document.body.scrollTop = 0
              this.setState({ scrollTop: false })
            }}>返回顶部</div>
          )}
        </div>
      </>
    )
  }
}
export default Shouye;