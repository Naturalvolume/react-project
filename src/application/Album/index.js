import React, {useState, useEffect} from 'react';
import {Container} from './style';
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

function Album (props) {
  // 这里用到了不同变量的解构
  const {currentAlbum:currentAlbumImmutable, enterLoading} = props
  // 注意！！在组件中使用数据时，要更改immutable为js类型
  // 要判断数据是否为空
  const currentAlbum = currentAlbumImmutable ? currentAlbumImmutable.toJS() : []
  const {getAlbumDataDispatch} = props

  const [showStatus, setShowStatus] = useState (true);

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
    console.log(id)
    getAlbumDataDispatch(id)
  }, [getAlbumDataDispatch, id])

  // 点击返回动画
  const handleBack = () => {
    setShowStatus (false);
  };
  

  
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
      classNames="fly" 
      appear={true} 
      unmountOnExit
      // onExited代表退出动画时执行退出路由
      onExited={props.history.goBack}
    >
    <Container>
      {/* 传入点击返回函数 */}
      <Header title='返回' handleClick={handleBack}></Header>
      {
        // 注意啦！！！这个组件中一定要先判断数据是否收到，这是一个三元表达式
        !isEmptyObject (currentAlbum) ? (   
      <Scroll bounceTop={false}>
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