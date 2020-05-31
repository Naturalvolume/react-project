import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Container} from './style';
import style from '../../assets/global-style'
// 引入动画插件
import { CSSTransition } from 'react-transition-group';

import Header from '../../baseUI/header'
import Scroll from '../../components/scroll'
import SongList from '../../baseUI/songList'
import { TopDesc, Menu } from './style'

import {getCount, isEmptyObject} from '../../api/utils'
import {connect} from 'react-redux'
import {actionCreators} from './store'
// 这里不需要用图片懒加载
// import LazyLoad from 'react-lazyload'
import Loading from '../../baseUI/loading'

function Album (props) {
  // 这里用到了不同变量的解构
  const {currentAlbum:currentAlbumImmutable, enterLoading} = props
  // 注意！！在组件中使用数据时，要更改immutable为js类型
  // 要判断数据是否为空
  const currentAlbum = currentAlbumImmutable ? currentAlbumImmutable.toJS() : []
  const {getAlbumDataDispatch} = props

  const [showStatus, setShowStatus] = useState (true);
  // 设置标题栏跑马灯效果
  const headerRef = useRef()
  const [isMarquee, setIsMarquee] = useState (false);
  const [title, setTitle] = useState("歌单")
  // 跑马灯逻辑
  const HEADER_HEIGHT = 45
  // 这个函数里有要传给子组件的数据，用useCallback包裹可以避免父元素每次生成不一样的
  // 函数引用时，子组件每次memo的结果都不一样，导致不必要的重新渲染，浪费memo的价值
  // useCallback 能够帮我们在依赖不变的情况保持一样的函数引用，最大程度地节约浏览器渲染性能。
  const handleScroll = useCallback((pos) => {
    let minScrollY = -HEADER_HEIGHT;
    // 根据滑动的高度得到百分比
    let percent = Math.abs (pos.y/minScrollY);
    // 取到子组件Header的dom元素
    let headerDom = headerRef.current;
    // 滑过顶部的高度开始变化
    if (pos.y < minScrollY) {
      headerDom.style.backgroundColor = style["theme-color"];
      // 根据百分比，设置透明度
      headerDom.style.opacity = Math.min (1, (percent-1)/2);
      setTitle(currentAlbum.name);
      setIsMarquee (true);
    } else {
      headerDom.style.backgroundColor = "";
      headerDom.style.opacity = 1;
      setTitle("歌单");
      setIsMarquee (false);
    }
  }, [currentAlbum]);
  // 从路由中拿到歌单的 id，这里太巧妙了！！
  // 在id值改变时重新渲染
  // but 这个getAlbumDataDispatch是什么意思
  const id = props.match.params.id;
  // 错误的代码！！！在这里不用传入id!!!
  // useEffect ((id) => {
  //   console.log(id)
  //   getAlbumDataDispatch(id)
  // }, [getAlbumDataDispatch, id])
  // 讲道理，加不加这个参数应该影响不大吧
  // 猜测这里应该还是跟箭头函数的使用有关
  useEffect (() => {
    getAlbumDataDispatch(id)
  }, [getAlbumDataDispatch, id])

  // 点击返回动画
  // 这个state是要传递给子元素的，所以可以通过useCallback优化性能
  const handleBack = useCallback (() => {
    setShowStatus (false);
  }, []);
  

  
  const renderTopDesc = () => {
    return (
      <TopDesc background={currentAlbum.coverImgUrl}>
        <div className="background">
          <div className="filter"></div>
        </div>
        <div className="img_wrapper">
          <div className="decorate"></div>
          <img src={currentAlbum.coverImgUrl} alt=""/>
          <div className="play_count">
            <i className="iconfont play">&#xe885;</i>
            <span className="count">{getCount(currentAlbum.subscribedCount)}</span>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{currentAlbum.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={currentAlbum.creator.avatarUrl} alt="" />
            </div>
            <div className="name">{currentAlbum.creator.nickname}</div>
          </div>
        </div>
      </TopDesc>
    )
  }

  return (
    // 让进场动画包裹在外层
    <CSSTransition
      in={showStatus}  
      timeout={300} 
      // 这里就是定义好的动画类，类名对应着.style.js文件中的进出场动画
      classNames="fly" 
      appear={true} 
      unmountOnExit
      // onExited代表退出动画时执行退出路由
      onExited={props.history.goBack}
    >
    <Container>
      {/* 传入点击返回函数 */}
      <Header ref={headerRef} isMarquee={isMarquee} title={title} handleClick={handleBack}></Header>
      {
        // 注意啦！！！这个组件中一定要先判断数据是否收到，这是一个三元表达式
        !isEmptyObject (currentAlbum) ? ( 
      // 滑动scroll触发标题栏改变逻辑 
      <Scroll bounceTop={false} onScroll={handleScroll}>
  <div>
    {renderTopDesc()}
    <Menu>
      <div>
        <i className="iconfont">&#xe6ad;</i>
        评论
      </div>
      <div>
        <i className="iconfont">&#xe86f;</i>
        点赞
      </div>
      <div>
        <i className="iconfont">&#xe62d;</i>
        收藏
      </div>
      <div>
        <i className="iconfont">&#xe606;</i>
        更多
      </div>
    </Menu>
    <SongList currentAlbum={currentAlbum}></SongList>
    { enterLoading ? <Loading></Loading> : null}
  </div>  
</Scroll>
   ) : null
  } 
    </Container>
    </CSSTransition>
  )
}

const mapStateToProps = (state) => ({
    // immutable数据必须使用 getIn 方法获得状态
    currentAlbum: state.getIn(['album', 'currentAlbum']),
    enterLoading: state.getIn(['album', 'enterLoading'])
})
// 
const mapDispatchToProps = (dispatch) => {
  return {
    getAlbumDataDispatch(id) {
      dispatch(actionCreators.getAlbumDetailList(id))
      // 注意啦！！这里每次发送请求数据动作都会同时触发动画动作
      // 然后在进行数据请求动作之后，在更改数据类型时同时dispatch数据和等待动画状态
      dispatch(actionCreators.changeEnterLoading(true))

    }
  }
}
// React.memo是react16.6的新特性，它是控制仅在它的 props 发生改变的时候进行重新渲染，提升性能
// 使用了React.memo和函数式组件就可以替代类组件的一些功能
// 两种使用方式：
// 1.引入 import { memo } from 'react'; 引出  export default memo(Album);
// 2.直接引出 export default React.memo(Album);

// connect()()连接redux到组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));