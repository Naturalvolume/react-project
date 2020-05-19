import styled from 'styled-components'

export const Content = styled.div `
  box-sizing: border-box;
  // 注意啦！包围盒设置为 固定布局，不让它随着页面跑
  position: fixed;
  top: 85px;
  width: 100%;
  padding: 5px;
  overflow: hidden;
`