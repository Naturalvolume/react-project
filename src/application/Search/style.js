import styled from 'styled-components'

export const Content = styled.div`
  // 使用固定定位把顶部栏和下面滚动条分割开，产生滚动时顶部栏不动的效果
  // 固定定位已经脱离了文档流，根元素也不会包含它，所以根元素的高度是 85px
  position: fixed;
  // 一定要使视口的高度绝对已知！！！所以上下距离都要确定！！只确定一个是不能滑动的！！！
  top: 85px;
  bottom: 0;
  width: 100%;
  // 激动！！第一次用到堆叠上下文的属性
  // 注意啦！！z-index属性只能在relative、absolute、fixed元素中使用
  // 一个纠结的事情，要让导航栏固定到搜索页面上面，就得设置z-index小于0
  // 但是后面的歌单列表，是搜索页面的子页面，设置z-index是一个大的数不管用。。。。。。
  // 只能在这里设置z-index，不能满足这两个组件的要求
  z-index: -1;
`

