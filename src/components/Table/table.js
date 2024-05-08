/* eslint-disable default-case */
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
import './table.css'
import Shouye from '../Shouye/shouye'
import Daiban from '../Daiban/daiban'
import Xiaoxi from '../Xiaoxi/xiaoxi'
import Wode from '../Wode/wode'
import { addToCart } from '../../redux/action/cart-actions';
import { updateCart } from '../../redux/action/cart-actions';
import { deleteFromCart } from '../../redux/action/cart-actions';
import store from '../../redux/store'

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // socket: io('127.0.0.1:7001'),//配置socket
            userName: '',//进入聊天室之后保存的用户名
            wordList: [],//聊天记录
            compont: <Shouye />
        }
    }
    UNSAFE_componentWillMount() {
        console.log('页面加载')
    }
    componentDidMount() {
        this.pageChange('home')
        // let { socket, wordList } = this.state;
        // socket.on('connect', (data) => {
        //   console.log(data)
        //   wordList.push(data)
        //   this.setState({ wordList });
        // })
        // store.dispatch(addToCart('1', 1, 250));
        // store.dispatch(addToCart('2', 2, 110));
        console.log('getStategetState')
        // store.dispatch(updateCart('bread 700g', 5, 1100));
        // store.dispatch(deleteFromCart('Coffee 500gm'));
    }

    pageChange = (key) => {
        let compont
        switch (key) {
            case 'home':
                window.productload = true 
                compont = <Shouye />
                break;
            case 'todo':
                window.productload = false
                window.removeEventListener('scroll', this.handleScroll, true)
                compont = <Daiban />
                break;
            case 'message':
                window.productload = false
                window.removeEventListener('scroll', this.handleScroll, true)
                compont = <Xiaoxi />
                break;
            case 'personalCenter':
                window.productload = false
                window.removeEventListener('scroll', this.handleScroll, true)
                compont = <Wode history={this.props.history} />
                break;
        }
        this.setState({ compont })
    }
    render() {
        let { userNameIpt, userSay, hide, wordList, userName } = this.state;
        let tabs = [
            {
                key: 'home',
                title: '首页',
                icon: <AppOutline />,
                badge: Badge.dot,
            },
            {
                key: 'todo',
                title: '待办',
                icon: <UnorderedListOutline />,
                badge: '5',
            },
            {
                key: 'message',
                title: '消息',
                icon: (active) =>
                    active ? <MessageFill /> : <MessageOutline />,
                badge: '99+',
            },
            {
                key: 'personalCenter',
                title: '我的',
                icon: <UserOutline />,
            },
        ]
        return (
            <>
                <div className='container'>
                    {this.state.compont}
                    <TabBar
                        className='footer'
                        onChange={value => this.pageChange(value)}
                        defaultActiveKey={'home'}
                    >
                        {tabs.map(item => (<TabBar.Item
                            key={item.key}
                            icon={item.icon}
                            title={item.title}

                        />))}
                    </TabBar>
                </div>
            </>
        )
    }
}
export default Table;
