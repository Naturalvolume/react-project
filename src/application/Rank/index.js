 import React, {useEffect} from 'react';
import {Content, GovernmentContainer, ItemList} from './style'
import Scroll from '../../components/scroll'
import { filterIndex } from '../../api/utils';
import {getRankList} from './store'
import {connect} from 'react-redux'
import { renderRoutes } from 'react-router-config';


function Rank(props) {
  const { rankList:list, loading } = props;
  const { getRankListDataDispatch } = props;
  const title1 = '官方榜'
  const title2 = '全球榜'
  // 在进行数据转换前一定要进行非空判断！！！否则空数组会报错
  let rankList = list ? list.toJS() : [];
  // 这部分官方榜和全球榜的数据需要手动分开
  let globalStartIndex = filterIndex (rankList);
  let officialList = rankList.slice (0, globalStartIndex);
  let globalList = rankList.slice (globalStartIndex);

  useEffect (() => {
    getRankListDataDispatch();
  }, []);

  const enterDetail = (item) => {
    // 这个貌似叫插值表达式？？？
    console.log(item)
    props.history.push(`/rank/${item.id}`)
  }

  return(
    <div>
    <Content>
      <Scroll>
        {/*  滑动框只能包含一个根元素！！所以渲染两个组件要用div包裹 */}
        <div>
      <GovernmentContainer>
        <div>{title1}</div>
          {
            officialList.map((item, index) => {
              return(
                // 又犯了这个错误！！！为什么箭头函数传值不太一样呢
                <ItemList key={index} onClick={() => enterDetail(item)}>
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
                <ItemList key={index} onClick={(item) => enterDetail(item)}>
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
    {renderRoutes(props.route.routes)}
    </div>
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
