import React, { Component } from 'react'
import { ImageUploader, Badge, Toast, TabBar } from 'antd-mobile'
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'
// import io from 'socket.io-client'
// import Axios from 'axios'
import './wode.css'
import { addToCart } from '../../redux/action/cart-actions';
import { updateCart } from '../../redux/action/cart-actions';
import { deleteFromCart } from '../../redux/action/cart-actions';
import store from '../../redux/store'

class Wode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // socket: io('127.0.0.1:7001'),//配置socket
      userName: '',//进入聊天室之后保存的用户名
      wordList: []//聊天记录
    }
  }

  componentDidMount() {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
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
      for (let i = 0; i < 100; i++) {
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
      const x = event.x ;
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

  render() {

      return(
      <>
    <div className='container' style={{ height: '1200px' }} >
      <canvas id="myCanvas" width="1000" height="1200" style={{ }}></canvas>
      {/* <div class="circle">
            <div class="inner-box">
              内部盒子
            </div>
            <div class="inner-box1">
              内部盒子
            </div>
            <div class="inner-box2">
              内部盒子
            </div>
            <div class="inner-box3">
              内部盒子
            </div>
          </div> */}

    </div>
      </>
    )
  }
}
export default Wode;
