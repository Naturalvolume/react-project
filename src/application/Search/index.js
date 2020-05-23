import React, {useEffect} from 'react'
import Slider from '../../components/slider'
import Scroll from '../../components/scroll'
import RecommendList from '../../components/recommendList'
import { Content } from './style'
// 连接 redux, connect是用来将全局状态state映射到组件的props上
import { connect } from "react-redux"
import * as actionTypes from './store/actionCreators'
// 引入滑动加载图片的方法
import { forceCheck } from 'react-lazyload'
// 一定要引入这个路由渲染组件，把下一页组件渲染出来
import { renderRoutes } from 'react-router-config';

function Search(props) {
  const { bannerList, recommendList } = props
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props
  // 参数为空数组[] 表示每次只在组件首次渲染后发出数据请求，相当于生命周期函数componentDidMount
  useEffect (() => {
    // step1: 调用dispatch函数
    // 优化性能二：页面切换时不发送网络请求，根据immutable数据的长度属性
    if(!bannerList.size) {
      getBannerDataDispatch()
    }
    if(!recommendList.size) {
      getRecommendListDataDispatch()
    }
    //eslint-disable-next-line
  }, []);
  // toJS 是 immutable 数据的方法
  const bannerListJS = bannerList ? bannerList.toJS () : [];
  const recommendListJS = recommendList ? recommendList.toJS () :[];
  return(
    <div>
      {/* better-scroll 就是在元素高度超过父元素高度时，使用transfrom 动画产生滑动效果
          所以它的外部容器一定是固定高度，不然没法滚动
      */}
      <Content>
        {/* 给滑动框加上滑动加载图片的方法 */}
        <Scroll className="list" onScroll={forceCheck}>
          {/* 注意啦，这里要给滑动组件 scroll 中的子组件添加一个元素包裹，不然会无法滑动 */}
          <div>
            <Slider bannerList={bannerListJS}></Slider>
            <RecommendList recommendList={recommendListJS}></RecommendList>
          </div>
        </Scroll>
        {/* // 注意啦！！！一定要用这个 将目前所在路由的下一层子路由加以渲染 */}
         
       { console.log(props.route.routes)}
      </Content> 
      {renderRoutes (props.route.routes) }
    </div>
  ) 
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  // 不要在这里将数据 toJS
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  // getIn 是 immutable 数据的方法，第一个参数是标识

  // step6: 根据state的变化更新页面
  bannerList: state.getIn (['search', 'bannerList']),
  recommendList: state.getIn (['search', 'recommendList']),
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch () {
      // step2: dispatch action
      dispatch (actionTypes.getBannerList ());
    },
    getRecommendListDataDispatch () {
      dispatch (actionTypes.getRecommendList ());
    }
  }
};

// 将 ui 组件包装成容器组件
export default connect (mapStateToProps, mapDispatchToProps)(React.memo (Search));
