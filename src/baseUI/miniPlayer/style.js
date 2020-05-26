import style from '../../assets/global-style'
import styled,{keyframes} from 'styled-components'

// 设置动画关键帧
const rotate = keyframes`
  // 开始时从0开始旋转
  0%{
    transform: rotate(0);
  }
  // 结束时要转到360度
  100%{
    transform: rotate(360deg);
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
  // 别忘了设置背景，否则就直接显示下层了
  background: #efdddd;
  padding: 5px;
  // 别忘了设置最上层
  z-index: 1000;
`
export const SingerWrapper = styled.div`
  display: flex;
  // padding: 4px;
  .img-wrapper {
    display: flex;
    // flex是 flex-grow（放大，默认0不变）flex-shrink（缩小，默认1缩小）flex-basis（相当于width，但是width级别高，默认auto）
    flex: 0 0 40px;
    margin-right: 5px;
    img {
      width: 40px;
      height:40px;
      // 圆弧角可以设置百分比
      border-radius: 50%;
      // 只能img使用的类
      &.play {
        // 这个类使用定义好的动画
        // 歌曲封面旋转动画
        animation: ${rotate} 10s infinite;
      }
    }
  }
  .title-wrapper {
    display: flex;
    flex-direction: column;
    // 也可以通过设置 line-height 使文本占据相同的位置
    justify-content: space-around;
    // 相当于flex: 1 1 0%，随空间放大缩小
    flex: 1;
    padding:3px;
    align-items: center;
    .song {
      font-size: ${style["font-size-s"]}
      color: black;
      font-weight: 500;
      // 文本溢出部分用...表示
      ${style.noWrap ()}
    }
    .singer {
      font-size: ${style["font-size-ss"]};
      color: gray;
      // 文本溢出部分用...表示
      ${style.noWrap ()}
    }
  }
`
export const IconsWrapper = styled.div`
  display: flex;
  .iconfont {
    margin: 0 5px;
  }
`