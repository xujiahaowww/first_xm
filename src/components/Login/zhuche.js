/* eslint-disable */
/* eslint-disable eqeqeq */
/* eslint-disable no-useless-concat */

import { useState, useEffect } from "react"
import './login.css'
import loginTp from '../img/loginjpg.jpg'
import axios from 'axios'
import { Toast, AutoCenter, Footer, Form, Input, Button, Radio } from 'antd-mobile'
import Utils from './function'
import { useSearchParams, useLocation, useParams } from "react-router-dom"
import Upload from './upload'
import store from '../../redux/store'

const App = props => {
    const [zhanghao, setZhmm] = useState({
        name: null,
        phoneNumber: null,
        password: null
    })//数组前面是读，后面是写，叫法无所谓
    const [uploadurl, setUuploadurl] = useState(null)//数组前面是读，后面是写，叫法无所谓
    //登陆确定
    const zhuChe = () => {
        if (!uploadurl) {
            Toast.show('请上传头像!!!', 1)
            return
        }
        if (!zhanghao.name) {
            Toast.show('请输入用户名!!!', 2)
            return
        }
        if (!zhanghao.phoneNumber) {
            Toast.show('请输入账号!!!', 2)
            return
        }
        if (!zhanghao.password) {
            Toast.show('请输入密码!!!', 2)
            return
        }
        if (!zhanghao.sex) {
            Toast.show('请选择性别!!!', 2)
            return
        }
        let max = 99999
        let min = 0

        let userinfo = {
            name: zhanghao.name,
            phoneNumber: zhanghao.phoneNumber,
            password: zhanghao.password,
            sex: zhanghao.sex,
            imgsrc: uploadurl,
            userID: Math.floor(Math.random() * (max - min + 1)) + min,
        }
        console.log(userinfo, 'userinfo')
        let url = "http://localhost:3007/api/registered"
        axios.post(url, userinfo).then((res) => {
            console.log(res, 'ressss')
            if (res.data.code == 4000) {
                Toast.show({
                    icon: 'fail',
                    content: `${res.data.info}`,
                })
            }
            if (res.data.code == 2001) {
                Toast.show('注册成功', 2);
                Utils.lcStorage.setItem('userinfo', {
                    name: zhanghao.name,
                    phoneNumber: zhanghao.phoneNumber,
                    password: zhanghao.password,
                    imgsrc: uploadurl,
                    userID: zhanghao.userID,
                    sex: zhanghao.sex,
                })
                props.history.back();
            }

        })

    }
    return (
        <div >
            <div class="div-relative" >
                <div style={{ textAlign: 'left', height: '30px', fontSize: 20, marginLeft: '10px' }}
                    onClick={(e) => {
                        props.history.back();
                        e.stopPropagation()
                    }}
                >
                    返回
                </div>
                <div class="div-b">
                    <div className="headphotosc">
                        <Upload onUpload={(value) => {
                            setUuploadurl(value)
                        }} />
                    </div>
                    <Form layout='horizontal'>
                        <Form.Item label='用户名' name='name'>
                            <Input
                                placeholder='请输入用户名'
                                clearable
                                onChange={async (value) => {
                                    await setZhmm({
                                        ...zhanghao,
                                        name: value,

                                    })
                                    console.log(zhanghao, 'zhanghao')
                                }}
                            />
                        </Form.Item>
                        <Form.Item label='账号' name='username'>
                            <Input
                                placeholder='请输入账号'
                                clearable
                                onChange={async (value) => {
                                    await setZhmm({
                                        ...zhanghao,
                                        phoneNumber: value,

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
                                        password: value,

                                    })
                                    console.log(zhanghao, 'zhanghao')
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            label='性别'
                            name='sex'
                        >
                            <Radio.Group
                                onChange={(v) => {
                                    setZhmm({
                                        ...zhanghao,
                                        sex: v,
                                    })
                                }}
                            >
                                <Radio value='男'>男</Radio>
                                &nbsp; &nbsp;
                                <Radio value='女'>女</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                    <div className="denglu" style={{ position: '', width: '100%' }}>
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

