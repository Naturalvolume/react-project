import styled from 'styled-components';
import style from '../../assets/global-style';

// 轮播图包围盒
export const SliderContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%
  margin: auto;
  background: ${style["background-color"]};
  // 设置遮罩样式，绝对定位脱离文档流
  // .mask {
  //   position: absolute;
  //   top: 0;
  //   height: 60%;
  //   width: 100%;
  //   background: ${style["theme-color"]};
  // }
  .slider-container {
    position: relative;
    // 两边留一点空白
    width: 98%;
    // 设置轮播图高度
    height: 160px;
    overflow: hidden;
    margin: auto;
    border-radius: 6px;
    .slider-nav {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
    }
    // 轮播图切换按钮
    .swiper-pagination-bullet-active {
      background: ${style["theme-color"]};
    }
  }
`