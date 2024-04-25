/* eslint-disable */
/* eslint-disable eqeqeq */
/* eslint-disable no-useless-concat */

import { useState, useEffect, useRef, MutableRefObject, useCallback } from "react"
import './login.css'
import loginTp from '../img/loginjpg.jpg'
import { Toast, AutoCenter, Footer, Form, Input, Button } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import Utils from './function'
import store from "../../redux/store"
import { adduserInfo, addToCart } from '../../redux/action/cart-actions'
import { debounce } from 'lodash'

let userinfo = Utils.lcStorage.getItem('userinfo') || {}
console.log(userinfo, 'userinfouserinfouserinfo')
const App = props => {
    const [state, setState] = useState({
        imgsrc: userinfo.imgsrc || '',
        userID: userinfo.userID || '',
        phoneNumber: userinfo.phoneNumber || null,
        password: userinfo.password || null,
        isLogin: userinfo.isLogin || false,
        name: userinfo.name || '',
    })//数组前面是读，后面是写，叫法无所谓
    const [verf, setVerf] = useState({
        yanzhengimg: '',
        yanzhengwenzi: '',
        yanzhengshuru: ''
    })//数组前面是读，后面是写，叫法无所谓
    const navigate = useNavigate()//useNavigate需要在函数组件内部使用

    useEffect(() => {

        var url = `http://localhost:3007/api/verif`
        axios.get(url, {}, {
            withCredentials: true
        }).then((res) => {
            console.log(res, 'resssss')
            setVerf({
                yanzhengimg: res.data.data,
                yanzhengwenzi: res.data.text
            })
        })
    }, [])
    useEffect(() => {
        console.log('密码改变执行')
    }, [state.password])
    // 改变验证图片
    const changeVerf = () => {
        var url = `http://localhost:3007/api/verif`
        axios.get(url, {}, {
            withCredentials: true
        }).then((res) => {
            console.log(res)
            setVerf({
                yanzhengimg: res.data.data,
                yanzhengwenzi: res.data.text
            })
        })
    }
    const input = async (value) => {
        await setState({
            ...state,
            phoneNumber: value,
        })
    }
    // let delayFn = (value)=>{
    //     useCallback(
    //         Utils.debounce(input(value), 2000)
    //     )
    // } 
    //登陆确定
    const queDing = () => {
        let userinfo = { ...state }
        if (!state.phoneNumber) {
            Toast.show('请输入账号!!!', 2)
            return
        }
        if (!state.password) {
            Toast.show('请输入密码!!!', 2)
            return
        }
        // if (!verf.yanzhengshuru) {
        //     Toast.show('请输入验证码!!!', 2)
        //     return
        // }
        // if (verf.yanzhengshuru.toLowerCase() !== verf.yanzhengwenzi.toLowerCase()) {
        //     Toast.show('验证码错误!!!', 2)
        //     return
        // }
        console.log(userinfo, 'userinfo')
        let url = "http://localhost:3007/api/login"
        axios.post(url, { phoneNumber: state.phoneNumber, password: state.password }).then((res) => {
            console.log(res, 'ressss')
            if (res.data.code == 4001) {
                Toast.show({
                    icon: 'fail',
                    content: `${res.data.info}`,
                })
            }
            if (res.data.code == 4003) {
                Toast.show('密码或用户名错误!!!', 2);
            }
            if (res.data.info == "登录成功") {
                Toast.show('登录成功', 2);
                new Promise(
                     (resolve, reject) => {
                        console.log(res.data.userData)
                        resolve(res.data.userData)
                    }
                ).then(
                    async (v) => {
                        store.dispatch(adduserInfo({ ...v }))
                        console.log(store.getState(), 'statatata2222')
                        await Utils.lcStorage.setItem('userinfo',
                            {
                                phoneNumber: v.phoneNumber,
                                password: v.password,
                                imgsrc: v.imgsrc,
                                userID: v.userID,
                                name: v.name,
                                sex: v.sex,
                                isLogin: true
                            })
                        console.log(Utils.lcStorage.getItem('userinfo'), '333333')
                        await navigate('/table')
                    }
                )

            }

        })

    }
    const zhuChe = () => {
        store.dispatch(adduserInfo('2', 2, 110));
        navigate('/zhuche' + '?bbb=456')
    }

    return (
        <div>
            <div class="div-relative" >
                <div class="denglupicture">
                    <div class="dengluword">
                        <AutoCenter>登陆界面</AutoCenter>
                    </div>
                    {/* <img
                        src={loginTp}
                        style={{ width: '100%', height: '65vh' }}
                    /> */}
                </div>
                <div className="caozuoquyu">
                    <div className="yhmandmm">
                        <Form layout='horizontal'>
                            <Form.Item label='手机号' name='name'>
                                <Input
                                    defaultValue={state.phoneNumber || ''}
                                    placeholder='请输入手机号'
                                    clearable
                                    onChange={async (value) => {
                                        input(value)
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label='密码'
                                name='password'
                            >
                                <Input
                                    defaultValue={state.password || ''}
                                    placeholder='请输入密码'
                                    clearable
                                    type={'text'}
                                    onChange={async (value) => {
                                        await setState({
                                            ...state,
                                            password: value,

                                        })
                                        console.log(state, 'phoneNumber')
                                    }}
                                />
                            </Form.Item>
                            <div className="Login_Register_item">
                                <Form.Item
                                    label='验证码'
                                    name='verf'
                                    className="Login_Register_item1"
                                >
                                    <Input
                                        defaultValue={''}
                                        onChange={(value) => {
                                            setVerf({
                                                ...verf,
                                                yanzhengshuru: value,
                                            })
                                        }}
                                        placeholder="请输入验证码"
                                    ></Input>
                                </Form.Item>
                                <div style={{ width: '130px', height: '50px', backgroundColor: verf.yanzhengimg ? 'white' : '#ece2e2' }}>
                                    <span className="Login_Register_item2" onClick={() => { changeVerf() }} dangerouslySetInnerHTML={{ __html: verf.yanzhengimg }}></span>
                                </div>
                            </div>
                        </Form>
                    </div>
                    <div className="yanzhengma">
                        <span onClick={() => { zhuChe() }}>
                            注册
                        </span>
                    </div>
                    <div className="denglu">
                        <Button block color='primary' size='large' onClick={() => { queDing() }}>
                            登陆
                        </Button>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default App;

