import styled from 'styled-components'
import style from '../../assets/global-style'

export const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  >span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: #7CA9C7;
    font-size: ${style["font-size-m"]};
    // vertical-align设置内联元素和table-cell元素垂直方向的布局，可以理解成字体
    vertical-align: middle;
  }
`
export const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style["font-size-m"]};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${style["theme-color"]};
    border: 1px solid ${style["theme-color"]};
    opacity: 0.8;
  }
`