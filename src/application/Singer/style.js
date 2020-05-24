import styled from 'styled-components'
import style from '../../assets/global-style'

export const Content = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 500;
  background-color: gray;
  // 这里是设置跳转动画效果
  transform-origin: right bottom;
  &.fly-enter, &.fly-appear {
    transform: rotateZ (30deg) translate3d (100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active {
    transition: transform .3s;
    transform: rotateZ (0deg) translate3d (0, 0, 0);
  }
  &.fly-exit {
    transform: rotateZ (0deg) translate3d (0, 0, 0);
  }
  &.fly-exit-active {
    transition: transform .3s;
    transform: rotateZ (30deg) translate3d (100%, 0, 0);
  }
`