/* eslint-disable no-lone-blocks */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React from 'react';
import axios from "axios";
import "./detail.css"
import { Modal, Button, Toast, } from 'antd-mobile';


class DetailPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataArr: {},
            foodDetail: {},
            foodDetailImg: [],
            phoneNumber: '',
            cakeNumber: 1,
            foodNumber: 1,
        }
    }
    componentWillUnmount() {
    }
    componentDidMount() {
        console.log("购物车测试", this.props.message)
        axios.post("http://localhost:7001/detailimg", {
            withCredentials: true,
            id: this.props.message?.foodID
        }).then((res) => {
            console.log(res, 'ressss')
            this.setState({ foodDetailImg: res.data })
        })
        this.setState({
            foodDetail: this.props.message,
            phoneNumber: localStorage.getItem("phoneNumber")
        })
    }


    //food页加入购物车按钮
    incarfood(fooditem) {
        var foodobj = { phoneNumber: this.state.phoneNumber, foodID: fooditem.foodID, foodNumber: this.state.foodNumber, carID: fooditem.carID }
        var url = "http://localhost:7001/incar"
        axios.post(url, foodobj, {
            withCredentials: true
        }).then((res) => {
            console.log(res)
            if (res.data.info == "成功加入购物车") {
                // const alert = Modal.alert;
                const alertInstance = alert('温馨提示', '成功加入购物车', [
                    { text: '以后再说', onPress: () => console.log(), style: 'default' },
                    {
                        text: '去购物车', onPress: () => {
                            this.props.history.push("/car")
                            console.log('ok')
                        }
                    },
                ]);
                var carsetTimeout = setTimeout(() => {
                    // 可以调用close方法以在外部close
                    console.log('auto close');
                    alertInstance.close();
                }, 500000);
            } else {
                Toast.info('已存在购物车', 3);
            }

        })

    }

    render() {
        return (
            <div>
                  <div className="blank"></div>
                <div className='detail_cake'>商品详情</div>
                <div className='detail'>
                    {this.state.foodDetailImg.map((item, key) => {
                        return <div key={key} className="detail_img">
                            <img style={{ width: '100%', height: '100%' }} src={item.imgsrc} alt="" />
                        </div>
                    })}
                </div>
                <div>
                    <div>
                        <div className="detail_price_box">
                            <span>￥</span>
                            <div className='detail_price'>{this.state.foodDetail.price}.00</div>
                        </div>
                        <div className="detail_introduce_box">
                            <p>{this.state.foodDetail.introduce}</p>
                        </div>
                    </div>
                    <div className="blank"></div>
                    <div className='detail_button'>
                        {/* <Button className="buy">立即购买</Button> */}
                        <Button className="cellect" onClick={this.incarfood.bind(this, this.state.foodDetail)}>加入购物车</Button>
                    </div>
                </div>
              

            </div>
        )
    }
}
export default DetailPage;

