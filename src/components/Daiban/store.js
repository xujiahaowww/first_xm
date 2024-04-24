/* eslint-disable */
import { observable, action, runInAction, toJS } from 'mobx'
import Utils from '../Login/function'
class Store {
    // 项目编号查询
    @observable dbxx = new Array
    @action getChange = params => {
        try {
            runInAction(() => {
                Utils.promise('/DM/xxwh/gr/ygsjk$m=Query.service',params).then(v => {
                    if (v.data) {
                        this.dbxx = v.data.results
                        console.log(this.dbxx, '33333333')
                    }
                })
            })
        } catch (error) {
            console.log('提交失败-->', error)
        }
    }

}
export default new Store()