import React, {useState, useEffect} from 'react'
import {Content,CollectButton,BgLayer,ImgWrapper} from './style'
import Scroll from '../../components/scroll'
import SongList from '../../baseUI/songList'
import Header from '../../baseUI/header'
// 跳转动画，根据这个动画还可以进行页面返回
import { CSSTransition } from "react-transition-group";
import {actionCreators} from './store'
import {connect} from 'react-redux'
import Loading from '../../baseUI/loading'

function Singer(props) {
  const {artist, enterLoading} = props
  // 注意啦！转换前一定要判断immutable数据是否为空啊！
  const artistJS = artist ? artist.toJS() : []
  const {getSingerDataDispatch} = props
  // 动画初始状态为true，直接跳转进来
  const [showStatus, setShowStatus] = useState(true)
  // 点击事件，设置动画状态为false，跳转出去
  const handleBack = () => {
    setShowStatus(false)
  }
 
  useEffect (() => {
    let id = props.match.params.id
    getSingerDataDispatch(id);
  }, [])


  return(
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      // 这里就是执行退出动画式，会进行的路由返回操作
      onExited={() => props.history.goBack ()}
    >
    <Content>
      <Scroll>
        {/* 把退出函数传给顶部栏，实现返回功能 */}
        <Header title='singer' handleClick={handleBack}></Header>
        <ImgWrapper bgUrl={artistJS.picUrl}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </CollectButton>
        <BgLayer></BgLayer>
          {/* <SongList currentAlbum={artist}></SongList> */}
          { enterLoading ? <Loading></Loading> : null}
        </Scroll>
      </Content>
    </CSSTransition>
  )
}
// 注意啦！箭头函数返回对象的要用括号
const mapStateToProps = state => {
  console.log(state.getIn(['singer','artist']))
  return {
    // 这里！！！为何 artist里存储了artist和enterloading的值
    // 还不能改成 state.getIn(['singer','artist'])
    // 疑惑！
    // ！！！阿拉搜！原来在合并reducer时，已经把这个组件对应的state命名为artist，解惑了！！！
  artist: state.getIn(['singer','artist']),
  enterLoading: state.getIn(['singer', 'enterLoading'])
}}
const mapDispatchToProps = (dispatch) => {
  return {
    // 返回的是一个整体函数
    getSingerDataDispatch (id) {
      dispatch (actionCreators.changeEnterLoading(true));
      dispatch (actionCreators.getSingerInfo(id));
    }
  }
}
export default  connect(mapStateToProps, mapDispatchToProps)(React.memo(Singer))