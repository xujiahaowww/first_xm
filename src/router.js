import React from "react"
import { HashRouter, Route, Routes } from "react-router-dom"
import { createHashHistory } from 'history'
import Login from "./components/Login/login"
import Zhuche from "./components/Login/zhuche"
import Table from "./components/Table/table"

class MyRouter extends React.Component {
    render() {
        const history = createHashHistory()
        return (
            <div>
                <HashRouter>
                    <Routes>
                        {/* 路由不用Switch做单一匹配 让底部导航栏可以一直显示（让"/"路由对应的tab栏可以与其他路由同时匹配，得到显示。）*/}
                        <Route path="/" element={<Login history={history} />}></Route>
                        <Route path="/zhuche" element={<Zhuche history={history} />}></Route>
                        <Route path="/table" element={<Table history={history} />}></Route>
                    </Routes>
                </HashRouter>
            </div>
        )
    }
}
export default MyRouter