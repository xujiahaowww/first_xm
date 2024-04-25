/*eslint-disable*/
import axios from 'axios'

const $axios = axios.create({
    timeout: 30000, // 30秒
    responseType: 'json',
})
const Utils = {
    debounce: (fn, delay) => {
        let valid = true;
        return function () {
            if (valid) { //如果阀门已经打开，就继续往下
                fn.apply(this, arguments);//定时器结束后执行
                setTimeout(() => {
                    valid = true;//执行完成后打开阀门
                }, delay)
                valid = false;//关闭阀门
            }
        }
    },
    throttle: (fn, delay) => {
        let valid = true;
        return function () {
            console.log(valid, 'validvalid')
            if (valid) { //如果阀门已经打开，就继续往下   
                fn.apply(this, arguments);//定时器结束后执行
                setTimeout(() => {
                    valid = true;//执行完成后打开阀门
                }, delay)
                valid = false;//关闭阀门
            }
        }
    },
    promise: (url, parmas) => {
        let promise = new Promise((resolve, reject) => {
            $axios({
                method: 'POST',
                url,
                data: parmas,
                headers: {
                    'M-Sy-AppId': '2020042317325994',
                    'M-Sy-Service': 'shineyue01',
                    'M-Sy-Version': '1.0.1',
                    'M-Sy-Token': null,
                    'login-token': '26f68f07b00876038096c41d2fa403c0',
                    'Content-Type': 'application/json;charset=UTF-8', // 指定消息格式
                },
            }).then(result => {
                resolve(result)
            }).catch(error => {
                reject(error)
            })
        })
        return promise
    },
    lcStorage: {
        setItem(key, value, expires) {
            let params = { key, value, expires }
            if (expires) {
                let data = Object.assign(params, { startTime: new Date().getTime() })
                localStorage.setItem(key, JSON.stringify(data))
            } else {
                if (Object.prototype.toString.call(value) === '[object Object]') {
                    value = JSON.stringify(value)
                }
                if (Object.prototype.toString.call(value) === '[object Array]') {
                    value = JSON.stringify(value)
                }
                console.log(value,'valuevaluevalue')
                localStorage.setItem(key, value)
            }
        },
        getItem(key) {
            let item = localStorage.getItem(key)
            try {
                item = JSON.parse(item)
            } catch (error) {
                // eslint-disable-next-line no-self-assign
                item = item
            }
            if (item && item.startTime) {
                let date = new Date().getTime()
                if (date - item.startTime > item.expires) {
                    localStorage.removeItem(name)
                    return false
                }
                return item.value
            }
            return item
        },
        removeItem(key) {
            localStorage.removeItem(key)
        },
        clearAll() {
            localStorage.clear()
        }
    },

    ssStorage: {
        setItem(key, value) {
            let data = { value }
            sessionStorage[key] = JSON.stringify(data)
        },
        getItem(key) {
            let data = sessionStorage[key]
            if (!data || data === 'null') {
                return null
            }
            return JSON.parse(data).value
        },
        removeItem(key) {
            sessionStorage.removeItem(key)
        },
        clearAll() {
            sessionStorage.clear()
        }
    }

}
export default Utils
