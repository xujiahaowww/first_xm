/* eslint-disable */
import { observable, action, runInAction, makeObservable } from 'mobx'
import Utils from '../Login/function'
class Store {
    constructor() {
        makeObservable(this);
    }
    @observable lbxx = new Array
    @action getlunbo = async params => {
        try {
            let res = await Utils.promise1('http://localhost:3007/wpapi/loadproduct', params)
            runInAction(() => {
                console.log(res,'resssss')
                if (res.data) {
                    this.lbxx = res.data.productData
                    console.log(this.lbxx, 'lbxxlbxxlbxxlbxx222')
                }
            })

        } catch (error) {
            console.log('提交失败-->', error)
        }
    }
    @observable zyxx = new Array
    @action getChange = params => {
        try {
            runInAction(() => {
                Utils.promise('http://localhost:3007/wpapi/loadproduct', params).then(v => {
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
    @observable detailxx = new Array
    @action getDetail = params => {
        try {
            runInAction(() => {
                Utils.promise('http://localhost:3007/wpapi/detail', params).then(v => {
                    if (v.data) {
                        this.detailxx = v.data.productData
                        console.log(this.detailxx, 'this.detailxxthis.detailxx')
                    }
                })
            })
        } catch (error) {
            console.log('提交失败-->', error)
        }
    }
}
export default new Store()