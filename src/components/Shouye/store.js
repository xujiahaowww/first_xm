/* eslint-disable */
import { observable, action, runInAction, toJS } from 'mobx'
import Utils from '../Login/function'
class Store {
    // 项目编号查询
    @observable zyxx = new Array
    @action getChange = params => {
        try {
            runInAction(() => {
                Utils.promise('http://localhost:3007/wpapi/loadproduct',params).then(v => {
                    if (v.data) {
                        this.zyxx = v.data.productData
                        console.log(this.zyxx, '33333333')
                    }
                })
            })
        } catch (error) {
            console.log('提交失败-->', error)
        }
    }

}
export default new Store()