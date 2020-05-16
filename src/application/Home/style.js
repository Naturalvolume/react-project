import styled from 'styled-components';
import style from '../../assets/global-style';
// 顶部栏
export const Top = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 5px 10px;
background: ${style["theme-color"]};
// 子元素span
&>span {
  line-height: 40px;
  color: #284C83;
  font-size: 20px;
  &.iconfont {
    font-size: 25px;
  }
}
`