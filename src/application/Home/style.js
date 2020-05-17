import styled from 'styled-components';
import style from '../../assets/global-style';
// 顶部栏
export const Top = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 5px 10px;
background: ${style["theme-color"]};
// 设置子元素span的格式，所以在Top中写span元素就直接是这个格式
&>span {
  line-height: 40px;
  color: #284C83;
  font-size: 20px;
  // span下iconfont类的样式
  &.iconfont {
    font-size: 25px;
  }
}
`
// 导航栏
export const Tab = styled.div`
  height: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: ${style["theme-color"]};
  padding: 5px 40px;
  // 路由跳转元素包裹后就变成了a标签
  a {
    color: #284C83;
    font-size: 14px;
    &.selected {
      padding: 3px 0;
      // 加粗
      font-weight: 700;
      color: #457777;      
      border-bottom: 2px solid #004444;
    }
  }
`
