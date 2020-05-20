import styled from 'styled-components'
import style from '../../assets/global-style'

export const Content = styled.div`
  // 注意啦！！在这里设置宽高是非常重要的！！不知道理解的对不对
  // 个人认为是固定定位元素可以直接占满剩下的位置
  width: 100%;
  height: 100%;
  position: fixed;
  top: 85px;
  bottom: 0;
  overflow: hidden;
`

export const GovernmentContainer = styled.div`
  // 在这里设置宽高是不行的，它是随着内容的尺寸改变的
  display: flex;
  flex-direction: column;
`

export const ItemList = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  padding: 5px;
  // 这里也好坑！！！！！！为什么父元素的布局属性会覆盖子元素的布局属性呢！！！想不明白
  // align-items: center;
  width: 100%;
  border-bottom: 1px solid ${style['border-color']};
  .imgContainer {
    margin-right: 20px;
    // 小tips:给图像上文字一个遮罩，防止在图像和文字都是白色的时候看不清文字
    .mask {
      position: absolute;
      bottom: 0;
      // 这里！！绝对定位元素已经脱离文档流了，所以宽度就占了全部，要考虑如何让它正好占到图片上
      // bfc 的神奇之处，脱离了imgContainer的文档流，没有脱离上一层 itemlist 的文档流
      // left:10px;
      // right: 300px;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
    }
    img {
      width:100px;
      height: 100px;
      border-radius: 3px;
    }
    span {
      position: absolute;
      bottom: 10px;
      left: 10px;
      font-size: ${style['font-size-ss']};
      color: ${style['border-color']}
    }
  }
  .listContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 5px 0;
    // align-items: center;
    span {
      //注意啦！！！没有 font－color 这个属性！！只有color
      // font-color: red;
      color: ${style["font-color-desc"]};
      font-weight:200;
    }
  }
`