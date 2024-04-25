import React, { Component } from 'react'
import { Popup, Form, Input, Button, List, Radio, Toast } from 'antd-mobile'
import {
  AppOutline,
  MessageOutline,
  PayCircleOutline,
  UnorderedListOutline,
  SetOutline,
} from 'antd-mobile-icons'
import Utils from '../Login/function'
import { useNavigate } from 'react-router-dom'
import './wode.css'
import { adduserInfo, addToCart } from '../../redux/action/cart-actions'
import store from '../../redux/store'
import axios from 'axios'


class Wode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible1: false,
    }
    this.userinfo = store.getState().shoppingCart.userData || {}
    // this.timer = null
  }


  componentDidMount() {
    console.log(this.userinfo, 'wodeuserinfo', store.getState())
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d")

    function resizeCanvas() {
      // 设置canvas宽度和高度为窗口的宽度和高度
      canvas.width = window.innerWidth;
      // canvas.height = window.innerHeight;

      // 这里可以添加其他的绘制代码
      // 例如：ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    window.addEventListener('resize', resizeCanvas, false)
    // ctx.fillRect(50, 50, 100, 100);
    let particleArray = [];
    class Particle {
      constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = {
          x: (Math.random() - 0.5) * velocity,
          y: (Math.random() - 0.5) * velocity,
        };
        this.opacity = 0;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        ctx.fill();
      }
      update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        if (this.opacity < 1) this.opacity += 0.02;
      }
      checkDistance(particle) {
        const distance = Math.sqrt(
          (this.x - particle.x) ** 2 + (this.y - particle.y) ** 2
        );
        if (distance < 100) {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(particle.x, particle.y);
          ctx.strokeStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b
            }, ${1 - distance / 100})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    }

    function init() {
      particleArray = [];
      for (let i = 0; i < 50; i++) {
        const radius = Math.random() * 2 + 1;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const color = {
          r: Math.floor(Math.random() * 255),
          g: Math.floor(Math.random() * 255),
          b: Math.floor(Math.random() * 255),
        };
        const particle = new Particle(x, y, radius, color, 3);
        particleArray.push(particle);
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        for (let j = i; j < particleArray.length; j++) {
          particleArray[i].checkDistance(particleArray[j]);
        }
        particleArray[i].update();
      }
    }
    init();
    animate();

    canvas.addEventListener("click", (event) => {
      const x = event.x;
      const y = event.y;
      for (let i = 0; i < 5; i++) {
        const radius = Math.random() * 20 + 10;
        const color = {
          r: Math.floor(Math.random() * 255),
          g: Math.floor(Math.random() * 255),
          b: Math.floor(Math.random() * 255),
        };
        // console.log(x, y)
        const particle = new Particle(x, y, radius, color, 5);
        particleArray.push(particle);
      }
    });
  }
  // componentWillUnmount(){
  //   this.timer = null
  //   clearInterval(this.timer)
  // }
  chAnge = () => {
    console.log('chAnge')
    console.log(this.userinfo, 'wodeuserinfo')
    let url = "http://localhost:3007/api/changeuserinfo"
    axios.post(url, { phoneNumber: this.userinfo.phoneNumber, password: this.userinfo.password, name: this.userinfo.name, sex: this.userinfo.sex, userID: this.userinfo.userID }).then((res) => {
      console.log(res, 'ressss')
      if (res.data.code == 4001) {
        Toast.show({
          icon: 'fail',
          content: `${res.data.info}`,
        })
      }

      if (res.data.info == "修改成功") {
        Toast.show('修改成功', 2);
        new Promise(
          (resolve, reject) => {
            console.log(this.userinfo)
            resolve(this.userinfo)
          }
        ).then(
          (v) => {
            store.dispatch(adduserInfo({ ...v }))
            Utils.lcStorage.setItem('this.userinfo',
              {
                phoneNumber: v.phoneNumber,
                password: v.password,
                imgsrc: v.imgsrc,
                userID: v.userID,
                name: v.name,
                sex: v.sex,
                isLogin: true
              })
            console.log(Utils.lcStorage.getItem('this.userinfo'), '333333')
            this.setState({ visible1: false })
          }
        )

      }

    })
  }
  loGout = () => {
    store.dispatch(adduserInfo({}))
    Utils.lcStorage.removeItem('this.userinfo')
    this.props.history.replace('/')
    window.location.reload()
  }
  render() {

    return (
      <>
        <div >
          <div style={{ position: 'relative', width: '100%', backgroundColor: 'CaptionText', top: '0%', left: '0%' }}>
            <canvas class="canvas" height="214px" id="myCanvas"></canvas>
            <div id="avatar-box" style={{ position: 'absolute', top: '45%', left: '39%' }}>
              <img class="userinfo-avatar" src={this.userinfo.imgsrc} alt="Avatar" width="100" height="100" />
              <div class="name"> {this.userinfo.name}</div>
            </div>
          </div>


          <div>
            <List>
              <List.Item prefix={<UnorderedListOutline />} onClick={() => { }}>
                账单
              </List.Item>
              <List.Item prefix={<PayCircleOutline />} onClick={() => { }}>
                总资产
              </List.Item>
              <List.Item prefix={<SetOutline />} onClick={() => { this.setState({ visible1: true }) }}>
                设置
              </List.Item>
            </List>
          </div>
          <Popup
            visible={this.state.visible1}
            onMaskClick={() => {
              this.setState({ visible1: false })
            }}
            onClose={() => {
              this.setState({ visible1: false })
            }}
            bodyStyle={{ height: '60vh' }}
          >
            <div>
              <Form layout='horizontal'>
                <Form.Item label='用户名' name='name'>
                  <Input
                    defaultValue={this.userinfo.name || ''}
                    placeholder='请输入用户名'
                    clearable
                    onChange={async (value) => {
                      this.userinfo.name = value
                    }}
                  />
                </Form.Item>
                <Form.Item label='账号' name='username'>
                  <Input
                    defaultValue={this.userinfo.phoneNumber || ''}
                    placeholder='请输入账号'
                    clearable
                    onChange={async (value) => {
                      this.userinfo.phoneNumber = value
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label='密码'
                  name='password'
                >
                  <Input
                    defaultValue={this.userinfo.password || ''}
                    placeholder='请输入密码'
                    clearable
                    type={'text'}
                    onChange={async (value) => {
                      this.userinfo.password = value
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label='性别'
                  name='sex'
                >
                  <Radio.Group
                    defaultValue={this.userinfo.sex || ''}
                    onChange={(v) => {
                      this.userinfo.sex = v
                    }}
                  >
                    <Radio value='男'>男</Radio>
                    &nbsp; &nbsp;
                    <Radio value='女'>女</Radio>
                  </Radio.Group>
                </Form.Item>
              </Form>
              <div className="botton" style={{ position: '', width: '100%' }}>
                <Button block color='primary' size='large' style={{ width: '50%', display: 'inline', textAlign: 'center' }} onClick={() => { this.chAnge() }}>
                  修改个人信息
                </Button>
                <Button block color='danger' size='large' style={{ width: '50%', display: 'inline', textAlign: 'center' }} onClick={() => { this.loGout() }}>
                  注销
                </Button>
              </div>
            </div>
          </Popup>
          {/* <div class="circle">
            <div class="inner-box">
            </div>
            <div class="inner-box1">
            </div>
            <div class="inner-box2">
            </div>
            <div class="inner-box3">
            </div>
          </div> */}
        </div>
      </>
    )
  }
}
export default Wode;
