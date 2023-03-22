/* eslint-disable */
/* eslint-disable eqeqeq */
/* eslint-disable no-useless-concat */

import { useState, useEffect, useRef, MutableRefObject } from "react"
import './login.css'
import loginTp from '../img/loginjpg.jpg'
import axios from 'axios'
import { Toast, AutoCenter, Footer, Form, Input, Button } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'


const App = props => {
    console.log('1Script开始')
    setTimeout(() => {
      console.log('4第一个回调函数，宏任务1')
      Promise.resolve().then(function () {
        console.log('5第四个回调函数，微任务2')
      })
    }, 0)
    setTimeout(() => {
      console.log('6第二个回调函数，宏任务2')
      Promise.resolve().then(function () {
        console.log('7第五个回调函数，微任务3')
      })
    }, 0)
    Promise.resolve().then(function () {
      console.log('2第三个回调函数，微任务1')
    })
    console.log('3Script结束')

    const [state, setState] = useState({
        imgsrc: '',
        userID: ''
    })//数组前面是读，后面是写，叫法无所谓
    const [zhanghao, setZhmm] = useState({
        zhanghao: null,
        mima: null
    })//数组前面是读，后面是写，叫法无所谓
    const [verf, setVerf] = useState({
        yanzhengimg: '',
        yanzhengwenzi: '',
        yanzhengshuru: ''
    })//数组前面是读，后面是写，叫法无所谓
    const navigate = useNavigate()//useNavigate需要在函数组件内部使用

    useEffect(() => {
        var url = "http://localhost:7001/verif"
        axios.post(url, {}, {
            withCredentials: true
        }).then((res) => {
            console.log(res, 'resssss')
            setVerf({
                yanzhengimg: res.data.data,
                yanzhengwenzi: res.data.text
            })
        })
        console.log(verf.yanzhengwenzi, 'verfverf')
        // var unsubscribe = store.subscribe(() => {
        //     setSj({ sj: store.getState().products.cart })
        // }
        // );
        // store.dispatch(addToCart(`${state.sj.length + 1}`, 1, 250))
        // unsubscribe();
    }, [])
    useEffect(() => {
        console.log('mima改变执行')
    }, [zhanghao.mima])
    // 改变验证图片
    const changeVerf = () => {
        var url = "http://localhost:7001/verif"
        axios.post(url, {}, {
            withCredentials: true
        }).then((res) => {
            console.log(res)
            setVerf({
                yanzhengimg: res.data.data,
                yanzhengwenzi: res.data.text
            })
        })
    }

    //登陆确定
    const queDing = () => {
        let userinfo = { phoneNumber: zhanghao.zhanghao, password: zhanghao.mima }
        if (!zhanghao.zhanghao) {
            Toast.show('请输入账号!!!', 2)
            return
        }
        if (!zhanghao.mima) {
            Toast.show('请输入密码!!!', 2)
            return
        }
        if (verf.yanzhengshuru.toLowerCase() !== verf.yanzhengwenzi.toLowerCase()) {
            Toast.show('验证码错误!!!', 2)
            return
        }
        console.log(userinfo, 'userinfo')
        let url = "http://localhost:7001/login" // http://10.104.2.53:7001/login
        axios.post(url, userinfo, {
            withCredentials: true
        }).then((res) => {
            console.log(res, 'ressss')
            if (res.data.code == 4001) {
                Toast.show({
                    icon: 'fail',
                    content: `${res.data.info}`,
                })
                this.changeRegister();
            }
            if (res.data.code == 4003) {
                Toast.show('密码或用户名错误!!!', 2);
            }
            if (res.data.info == "登录成功") {
                Toast.show('登录成功', 2);
                // this.props.history.back();
                setState({
                    imgsrc: res.data.imgsrc,
                    userID: res.data.userID
                })
                localStorage.setItem("isLogin", true)
                localStorage.setItem("phoneNumber", zhanghao.zhanghao)
                localStorage.setItem("imgsrc", state.imgsrc)
                localStorage.setItem("userID", state.userID)
                navigate('/table')
            }

        })

    }

    const zhuChe = () => {
        // store.dispatch(addToCart('2', 2, 110));
        navigate('/zhuche' + '?bbb=456')

    }
    return (
        <div>
            <div class="div-relative" >
                <div class="div-b">
                    <img
                        src={loginTp}
                        style={{ width: '100%' ,height: '65vh'}}
                    />
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
                        <Form.Item
                            label='验证码'
                            name='verf'
                        >
                            <Input
                                onChange={(value) => {
                                    setVerf({
                                        ...verf,
                                        yanzhengshuru: value,

                                    })
                                }}
                                placeholder="请输入验证码"
                            ></Input>
                        </Form.Item>
                    </Form>
                    <div className="yanzhengma">
                        <span className="yanzhengma" onClick={() => { changeVerf() }} dangerouslySetInnerHTML={{ __html: verf.yanzhengimg }}></span>
                    </div>
                    <div className="zhuche" >
                        <span onClick={() => { zhuChe() }}>
                            注册
                        </span>
                    </div>
                    <div style={{ width: '100%' }}>
                        <Button block color='primary' size='large' onClick={() => { queDing() }}>
                            登陆
                        </Button>
                    </div>

                </div>
                <div class="div-a">
                    <AutoCenter>登陆界面</AutoCenter>
                </div>
            </div>
        </div>
    )
}
export default App;

