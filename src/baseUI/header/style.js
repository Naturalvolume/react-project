import styled from 'styled-components'
import style from '../../assets/global-style'
// 这是顶部固定栏
export const HeaderContainer = styled.div`
  position: fixed;
  padding: 5px 10px;
  padding-top: 0;
  height: 40px;
  width: 100%;
  // 在这里设置了堆，让标题栏显示在最上面
  z-index: 2000;
  display: flex;
  line-height: 40px;
  // 这里不设置背景，就可以显示封面的背景
  // background-color: yellow;
  color: ${style["font-color-light"]};
  div {
    display: flex;
    flex-direction: row;
  }
  .back {
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }
  >h1 {
    font-size: ${style["font-size-l"]};
    font-weight: 700;
  }
`