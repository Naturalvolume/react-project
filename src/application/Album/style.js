import styled from 'styled-components'
// container和wrapper的约定含义
// container用于包裹多个元素的结构，wrapper是针对单个元素包装的
// 所以通常将根组件元素定义为 ComponentContainer
// 下一级定义为ComponentWrapper，在wrapper里面以类的形式定义它包含元素的样式C
export const Content = styled.div`

`

export const CoverContainer = styled.div`

`
export const ListContainer = styled.div`

`

// 貌似理解了一点，路由切换其实就是一个堆叠上下文覆盖的过程
export const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  // 这里？？？明明优先级设置的已经最高了，为什么没有把导航栏覆盖掉
  z-index: 1000;
  background: #fff;
  
  transform-origin: right bottom;
  &.fly-enter, &.fly-appear {
    transform: translate3d (100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active {
    transition: transform .3s;
    transform: translate3d (0, 0, 0);
  }
  &.fly-exit {
    transform: translate3d (0, 0, 0);
  }
  &.fly-exit-active {
    transition: transform .3s;
    transform: translate3d (100%, 0, 0);
  }
  
`

