import React, {useEffect, useImperativeHandle, useRef, forwardRef} from 'react';
import styled from 'styled-components';
import { prefixStyle } from './../../api/utils';
import style from '../../assets/global-style';

const Container = styled.div`
  .icon_wrapper {
    position: fixed;
    z-index: 1000;
    margin-top: -10px;
    margin-left: -10px;
    color: ${style["theme-color"]};
    font-size: 14px;
    display: none;
    transition: transform 1s cubic-bezier (.62,-0.1,.86,.57);
    transform: translate3d (0, 0, 0);
    >div {
      transition: transform 1s;
    }
  }
`
// forwardRef可以让函数组件像类组件一样接收ref属性（定义到子组件上）
// 1. 在父组件中操作子组件的ref对象
// 2. 将父组件中的ref对象转发到子组件中的dom元素上
// 3. 包裹子组件，子组件接受props和ref作为参数
const MusicNote = forwardRef ((props, ref) => {
  // 这里的ref是只在子组件中操作的ref，不传递
  const iconsRef = useRef ();
  // 容器中有 3 个音符，也就是同时只能有 3 个音符下落
  const ICON_NUMBER = 3;

  const transform = prefixStyle ("transform");
  // 音符掉落动画
  const startAnimation = ({x, y}) => {
    for (let i = 0; i < ICON_NUMBER; i++) {
      let domArray = [].slice.call (iconsRef.current.children)
      let item = domArray[i]
      // 选择一个空闲的元素来开始动画
      if (item.running === false) {
        // 定位渲染icon
        item.style.left = x + "px";
        item.style.top = y + "px";
        item.style.display = "inline-block";
        // 注意啦！这里用到了浏览器渲染机制
        // 用定时器使动画在icon渲染出来后，再触发
        // 因为元素的渲染需要浏览器回流，只有本次的宏任务完成后才能触发浏览器GUI渲染线程
        // 重绘后再执行宏任务
        setTimeout (() => {
          item.running = true;
          item.style[transform] = `translate3d (0, 750px, 0)`;
          let icon = item.querySelector ("div");
          icon.style[transform] = `translate3d (-40px, 0, 0)`;
        }, 20);
        break;
      }
    }
  };
  // 使用ref时，自定义暴露给父组件的实例和方法
  // 防止一些不想暴露给父组件的方法暴露
  // 这里只把动画逻辑暴露出去
  useImperativeHandle (ref, () => ({
    startAnimation
  }));

  // 原生 DOM 操作，返回一个 DOM 节点对象
  const createNode = (txt) => {
    const template = `<div class='icon_wrapper'>${txt}</div>`;
    let tempNode = document.createElement ('div');
    tempNode.innerHTML = template;
    return tempNode.firstChild;
  }
  // 渲染指定数量的icon
  useEffect (() => {
    for (let i = 0; i < ICON_NUMBER; i++){
      let node = createNode (`<div class="iconfont">&#xe642;</div>`);
      iconsRef.current.appendChild (node);
    }
    // 类数组转换成数组，当然也可以用 [...xxx] 解构语法或者 Array.from ()
    // 给每个icon添加属性
    let domArray = [].slice.call (iconsRef.current.children);
    domArray.forEach (item => {
      item.running = false;
      item.addEventListener ('transitionend', function () {
        this.style['display'] = 'none';
        this.style[transform] = `translate3d (0, 0, 0)`;
        this.running = false;

        let icon = this.querySelector ('div');
        icon.style[transform] = `translate3d (0, 0, 0)`;
      }, false);
    });
    //eslint-disable-next-line
  }, []);
  return (
    <Container ref={iconsRef}>
    </Container>
  )
  
})

export default React.memo (MusicNote);