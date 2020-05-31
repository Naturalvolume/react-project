import React from 'react';
import styled, { keyframes } from 'styled-components';
import style from '../../assets/global-style';
// 根据变形动画的x,y轴变形倍数变化形成
const loading = keyframes`
  // 开始和最后的元素x,y轴变形倍数为0
  0%, 100% {
    transform: scale(0.0);
  }
  // 中间的元素x,y轴变化倍数为1
  50% {
    transform: scale(1.0);
  }
`
const LoadingWrapper = styled.div`
  >div {
    position: fixed;
    z-index: 1000;
    left: 0; 
    right: 0;  
    top: 0;
    bottom: 0;
    margin: auto;
    // 圆的大小
    width: 60px;
    height: 60px;
    opacity: 0.6;
    // 圆
    border-radius: 50%;
    background-color: ${style["theme-color"]};
    // 这里就是控制数据加载中动画的布尔值了
    // infinite代表无限次重复，ease-in 表示慢速开始
    animation: ${loading} 1.4s infinite ease-in;
  }
  // 规定第二个子元素的属性
  >div:nth-child (2) {
    // 动画延迟之心 0.7s 做成两个圆交错的效果
    animation-delay: -0.7s;
  }
`

function Loading ()  {
  return (
    <LoadingWrapper>
      {/* 两个动画元素 */}
      <div></div>
      <div></div>
    </LoadingWrapper>
  );
}
 
export default React.memo (Loading);