/* eslint-disable */
/* eslint-disable eqeqeq */
/* eslint-disable no-useless-concat */

import { useState, useEffect } from "react"
import './login.css'
import loginTp from '../img/loginjpg.jpg'
import axios from 'axios'
import { Toast, AutoCenter, Footer, Form, Input, Button } from 'antd-mobile'
import {useSearchParams,useLocation ,useParams } from "react-router-dom"
import store from '../../redux/store'

const App = props => {
    console.log(props,'propsprops')
    const [n, setN] = useState(0)//数组前面是读，后面是写，叫法无所谓
    const [state, setSj] = useState({
        sj: []
    })//数组前面是读，后面是写，叫法无所谓
    const [zhanghao, setZhmm] = useState({
        zhanghao: null,
        mima: null
    })//数组前面是读，后面是写，叫法无所谓
    const [verf, setVerf] = useState({
        yanzhengimg: '',
        yanzhengwenzi: ''
    })//数组前面是读，后面是写，叫法无所谓
    //登陆确定
    const zhuChe = () => {
        if(!zhanghao.zhanghao){
            Toast.show('请输入账号!!!', 2)
            return
        }
        if(!zhanghao.mima){
            Toast.show('请输入密码!!!', 2)
            return
        }
        let userinfo = { phoneNumber: zhanghao.zhanghao, password: zhanghao.mima }
        console.log(userinfo, 'userinfo')
        let url = "http://localhost:7001/registered"
        axios.post(url, userinfo, {
            withCredentials: true
        }).then((res) => {
            console.log(res, 'ressss')
            if (res.data.code == 4000) {
                Toast.show({
                    icon: 'fail',
                    content: `${res.data.info}`,
                })
            }
            if (res.data.code == 2000) {
                Toast.show('注册成功', 2);
                props.history.back();
                // this.setState({
                //     imgsrc: res.data.imgsrc,
                //     userID: res.data.userID
                // })
                // localStorage.setItem("isLogin", true)
                // localStorage.setItem("phoneNumber", this.state.phoneNumber)
                // localStorage.setItem("imgsrc", this.state.imgsrc)
                // localStorage.setItem("userID", this.state.userID)
            }

        })

    }
    return (
        <div>
            <div class="div-relative" >
            <div style={{textAlign: 'left',height: '30px',fontSize: 20}}
                onClick = {(e)=>{
                    props.history.back();
                    e.stopPropagation()
                }}
            >
                        返回
                    </div>
                <div class="div-b">
                    <Form layout='horizontal'>
                        <Form.Item label='用户名' name='username'>
                            <Input
                                placeholder='请输入用户名'
                                clearable
                                onChange={async (value) => {
                                    await setZhmm({
                                        ...zhanghao,
                                        zhanghao: value,

                                    })
                                    console.log(zhanghao, 'zhanghao')
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            label='密码'
                            name='password'
                        >
                            <Input
                                placeholder='请输入密码'
                                clearable
                                type={'text'}
                                onChange={async (value) => {
                                    await setZhmm({
                                        ...zhanghao,
                                        mima: value,

                                    })
                                    console.log(zhanghao, 'zhanghao')
                                }}
                            />
                        </Form.Item>
                    </Form>
                    <div style={{ position: '', width: '100%' }}>
                        <Button block color='primary' size='large' onClick={() => { zhuChe() }}>
                            注册
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default App;

