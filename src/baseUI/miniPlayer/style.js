import style from '../../assets/global-style'
import styled,{keyframes} from 'styled-components'

// 设置动画
const rotate = keyframes`
  0%{
    transform: rotate (0);
  }
  100%{
    transform: rotate (360deg);
  }
`

export const Container = styled.div`
  // 注意啦！！别忘了设置盒子模型样式
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 5px;
  // 别忘了设置最上层
  z-index: 1000;
`
export const SingerWrapper = styled.div`
  display: flex;
  // padding: 4px;
  .img-wrapper {
    margin-right: 5px;
    img {
      width: 40px;
      height:40px;
      // 圆弧角可以设置百分比
      border-radius: 50%;
    }
  }
  .title-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding:3px;
    align-items: center;
    .song {
      font-size: ${style["font-size-s"]}
      color: black;
      font-weight: 500;
    }
    .singer {
      font-size: ${style["font-size-ss"]};
      color: gray;
    }
  }
`
export const IconsWrapper = styled.div`
  display: flex;
  .iconfont {
    margin: 0 5px;
  }
`