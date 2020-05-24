import React, {useState, useEffect} from 'react'
import Horizon from '../../baseUI/horizon-item'
import { categoryTypes, alphaTypes } from '../../api/config'
import { Content, ListContainer, List, ListItem } from './style'
import Scroll from '../../components/scroll'
import { 
  getSingerList, 
  getHotSingerList, 
  changeEnterLoading, 
  changePageCount, 
  refreshMoreSingerList, 
  changePullUpLoading, 
  changePullDownLoading, 
  refreshMoreHotSingerList 
} from './store/actionCreator'
import {connect} from 'react-redux'
// 性能优化
// import Loading from '../../baseUI/loading';
import  LazyLoad, {forceCheck} from 'react-lazyload';
import { renderRoutes } from 'react-router-config'
import {NavLink} from 'react-router-dom'

function Singers(props) {
  // 对象的解构是用大括号！！！
  const {singerList, enterLoading, pullUpLoading, pullDownLoading,pageCount} = props
  const {getHotSingerDispatch, updateDispatch, pullDownRefreshDispatch, pullUpRefreshDispatch} = props

  // 要实现点击更改元素的样式，要获得元素的key值
  let [category, setCategory] = useState ('');
  let [alpha, setAlpha] = useState ('');
  // 点击更改state
  let handleUpdateAlpha = (val) => {
    setAlpha (val);
    // 在这里dispatch，传入改变的状态
    updateDispatch(category, val);
    console.log(singerList)
  }

  let handleUpdateCategory = (val) => {
    setCategory (val);
    updateDispatch(val, alpha);
    console.log(singerList)
  }

  // 歌手列表
  
  // useEffect传入的第一个参数是函数，通常都使用箭头函数（匿名函数）
  // 一开始先加载出热门歌手列表
  // 
  useEffect(() => {
    getHotSingerDispatch();
    // eslint-disable-next-line
  }, []);

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === '', pageCount);
  };

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  };

  // 这是组件化的另一种形式，通过定义渲染函数，返回对应的组件结构，同时在style中定义样式
  const renderSingerList = () => {
    // 注意啦！！！！！！一定要将数据从 immutable 转换回来！！！！不然加载不出来数据的！！
    const list = singerList ? singerList.toJS(): [];
    return (
      <List>
        {
          list.map ((item, index) => {
            return (
              // 使用了两种跳转页面方法，一种是 props.history.push()改变路由地址
              // 一种是使用router-dom的容器 <NavLink>跳转
              // 注意啦！！要给循环生成的元素在最外层元素中添加一个特殊的键值key
              <NavLink  key={item.id} to={`/singers/${item.id}`}>
              <ListItem>
                <div className="img_wrapper">
                  <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                </div>
                <span className="name">{item.name}</span>
              </ListItem>
              </NavLink>
            )
          })
        }
      </List>
    )
  };

  return(
    <div>
    <Content>
      {/* 注意啦！滑动框能滑动的原理是里面的内容宽度超过外面了的父元素宽度，所以一定要给滑动框加父元素 */}
      {/* 现在还是不能滑动，因为滑动内容的宽度没有确定，需要操作dom元素获得horizon组件的宽度，这一点在组件中实现了 */}

      {/* 要点击改变对应元素的边框 */}
      <Horizon list={categoryTypes} title={"分类 (默认热门):"} handleClick={handleUpdateCategory} curVal={category}></Horizon>
      <Horizon list={alphaTypes} title={"首字母:"} handleClick={handleUpdateAlpha} curVal={alpha}></Horizon>
    </Content>
    <ListContainer>
      <Scroll
        pullUp={ handlePullUp }
        pullDown = { handlePullDown }
        pullUpLoading = { pullUpLoading }
        pullDownLoading = { pullDownLoading }
        onScroll={forceCheck}
      >
       { renderSingerList () }
      </Scroll>
    </ListContainer>
    {renderRoutes(props.route.routes)}
    </div>
    
  ) 
}

const mapStateToProps = (state) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
});
const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0));//由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true));//loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
      dispatch(getSingerList(category, alpha));
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count+1));
      if(hot){
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0));//属于重新获取数据
      if(category === '' && alpha === ''){
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category, alpha));
      }
    }
  }
};   

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))