import React, { Component } from 'react'
import { Popup, Badge, Toast, TabBar, List } from 'antd-mobile'
import {
  AppOutline,
  MessageOutline,
  PayCircleOutline,
  UnorderedListOutline,
  SetOutline,
} from 'antd-mobile-icons'
import Utils from '../Login/function'
import './wode.css'
import { addToCart } from '../../redux/action/cart-actions';
import { updateCart } from '../../redux/action/cart-actions';
import { deleteFromCart } from '../../redux/action/cart-actions';
import store from '../../redux/store'

let userinfo = Utils.lcStorage.getItem('userinfo') || {}
class Wode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible1: false

    }
    // this.timer = null
  }


  componentDidMount() {
    console.log(userinfo, 'userinfouserinfo7')
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
  render() {

    return (
      <>
        <div >
          <div style={{ position: 'relative', width: '100%', backgroundColor: 'CaptionText', top: '0%', left: '0%' }}>
            <canvas class="canvas" height="214px" id="myCanvas"></canvas>
            <div id="avatar-box" style={{ position: 'absolute', top: '45%', left: '39%' }}>
              <img class="userinfo-avatar" src={userinfo.imgsrc} alt="Avatar" width="100" height="100" />
              <div class="name"> {userinfo.name}</div>
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
