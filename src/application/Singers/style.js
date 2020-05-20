import styled from 'styled-components'
import style from '../../assets/global-style'

export const Content = styled.div `
  box-sizing: border-box;
  // 注意啦！包围盒设置为 固定布局，不让它随着页面跑
  position: fixed;
  top: 85px;
  width: 100%;
  padding: 5px;
  overflow: hidden;
`
// 定义滑动框，注意要使用
export const ListContainer = styled.div`
  position: fixed;
  top: 155px;
  width: 100%;
  // 又踩一坑！！！！！注意要这个滑动框要尺寸绝对确定！！！所以只定义上面的高度是不行的，left、bottom都要确定！
  left: 0;
  bottom: 0;
  overflow:hidden;
  // position: fixed;
  // top: 160px;
  
  // overflow: hidden;
  // width: 100%;
`;
// 这是包围整个歌手列表的盒子
// 关于这里的布局也是要重新搞一遍！！！！因为不细心！！！写错了一点！！导致没理解明白！！！一定要细心细心再细心！！
export const List = styled.div`
  // width: 100%;
  // height: 100%;
  // display: flex;
  // direction: row;
  // justify-content: flex-start;
  // // 要定义可以换行，因为默认值是不换行
  // // flex-wrap: wrap;
  // padding: 0;
  // display: flex;
  // margin: auto;
  // flex-direction: column;
  // overflow: hidden;
`;
export const ListItem = styled.div`
// box-sizing: border-box;
// display: flex;
// flex-direction: row;
// margin: 0 5px;
// padding: 5px 0;
// // align-items: center;
// border-bottom: 1px solid ${style["border-color"]};

  width: 100%;
  display: flex;
  flex-direction: row;
  // justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  // padding: 5px;
  border-bottom: 1px solid ${style['border-color']};
  .img_wrapper{
    margin-right: 20px;
    padding: 10px;
    img {
      // 注意啦！具体的尺寸要在最后的元素上定义，不要在包围元素中定义
      border-radius: 5px;
      width: 50px;
      height: 50px;
    }
  }
  .name {
    font-size: ${style["font-size-m"]};
    color: ${style["font-color-desc"]};
    font-weight: 500;
  }
`;
