 import React, {useEffect} from 'react';
import {Content, GovernmentContainer, ItemList} from './style'
import Scroll from '../../components/scroll'
import { filterIndex } from '../../api/utils';
import {getRankList} from './store'
import {connect} from 'react-redux'

function Rank(props) {
  const { rankList:list, loading } = props;
  const { getRankListDataDispatch } = props;
  const title1 = '官方榜'
  const title2 = '全球榜'
  let rankList = list ? list.toJS () : [];
  // 这部分官方榜和全球榜的数据需要手动分开
  let globalStartIndex = filterIndex (rankList);
  let officialList = rankList.slice (0, globalStartIndex);
  let globalList = rankList.slice (globalStartIndex);

  useEffect (() => {
    getRankListDataDispatch();
  }, []);

  return(
    <Content>
      <Scroll>
        {/*  滑动框只能包含一个根元素！！所以渲染两个组件要用div包裹 */}
        <div>
      <GovernmentContainer>
        <div>{title1}</div>
          {
            officialList.map((item, index) => {
              return(
                <ItemList key={index}>
                  <div className='imgContainer'>
                    {/* 注意了！！图像标签是 <img> 而不是<image> */}
                    {/* 注意啦！！给图片增加性质时，要用代码符号包裹，在代码符号中取对象值时，要用${} 符号包裹 */}
                    <div className='mask'></div>
                    <img src={`${item.coverImgUrl}?param=300x300`} alt='cover'></img>
                    <span>{item.updateFrequency}</span>
                  </div>
                  {/* 这里渲染描述信息 item.tracks */}
                </ItemList>
              )          
            })
          }
      </GovernmentContainer>
      {/* 全球榜！这里有很多重复的组件，可以直接抽象成一个组件 */}
      <GovernmentContainer>
      <div>{title2}</div>
          {
            globalList.map((item, index) => {
              return(
                <ItemList key={index}>
                  <div className='imgContainer'>
                    {/* 注意了！！图像标签是 <img> 而不是<image> */}
                    {/* 注意啦！！给图片增加性质时，要用代码符号包裹，在代码符号中取对象值时，要用${} 符号包裹 */}
                    <div className='mask'></div>
                    <img src={`${item.coverImgUrl}?param=300x300`} alt='cover'></img>
                    <span>{item.updateFrequency}</span>
                  </div>
                  {/* 这里渲染描述信息 item.tracks */}
                </ItemList>
              )          
            })
          }
      </GovernmentContainer>
      
        </div>
      </Scroll>
    </Content>
  ) 
} 
const mapStateToProps = (state) => ({
  rankList: state.getIn (['rank', 'rankList']),
  loading: state.getIn (['rank', 'loading']),
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDataDispatch () {
      dispatch (getRankList ());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo (Rank));
