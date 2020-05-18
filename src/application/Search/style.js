import styled from 'styled-components'

export const Content = styled.div`
  // 使用固定定位把顶部栏和下面滚动条分割开，产生滚动时顶部栏不动的效果
  // 固定定位已经脱离了文档流，根元素也不会包含它，所以根元素的高度是 85px
  position: fixed;
  top: 85px;
  bottom: 0;
  width: 100%;
`