import React,{useRef} from 'react'
import {Container,SingerWrapper,IconsWrapper} from './style'
import {getName} from '../../api/utils'
import {CSSTransition} from 'react-transition-group'
// import {Route, withRouter} from 'react-router-dom'
// import NormalPlayer from '../normalPlayer'
import ProgressCircle from '../progress-circle'

function MiniPlayer(props) {
  const {song, fullScreen} = props
  const {toggleFullScreen} = props

  // 先 mock 一份 percent 数据
let percent = 1;


  // 使用useRef钩子使能取到dom元素
  const miniPlayerRef = useRef()
  // const handlePlayer = () => {
  //   // 注意啦！！！没有用Route包裹的组件默认是没有props.history属性的！！
  //   // 所以这里需要一点技巧！！使用 withRouter 函数包裹这个组件，可以使用history了！！
  //   // ${} 是字面量表达式``中的传值
  //   props.history.push(`/player/${song}`)
  // }
  return(
    // 用动画做出切换全屏歌词的效果
    <CSSTransition 
      className='mini'
      // css动画的in属性可以控制进场动画实现两个播放器页面切换的效果
      in={!fullScreen}
      timeout={300}
      // 进入设置播放器显示
      onEnter={() => {miniPlayerRef.current.style.display = "flex";}}
      // 退出设置播放器不显示
      onExited={() => {miniPlayerRef.current.style.display = "none";}}
    >
      {/* 用ref能够取到播放器的dom元素，点击改变fullScreen属性，显示全屏 */}
    <Container ref={miniPlayerRef} onClick={() => toggleFullScreen(true)}>
      <SingerWrapper>
        {/* 通过路由传值时，不能还是用 NavLink 标签跳转，这个标签的路径是确定的 */}
        {/* 可以借助props.history方法跳转加传值 */}
        {/* <NavLink to='/player'> */}
        <div className='img-wrapper'>
          <img className='play' src={song.al.picUrl} alt='cover'></img>
        </div>
        {/* </NavLink> */}
        <div className="title-wrapper">
          <div className="song">{song.name}</div>
          <div className='singer'>{getName(song.ar)}</div>
        </div>
      </SingerWrapper>
      <IconsWrapper>
        <div className='iconfont'>
        <ProgressCircle radius={32} percent={percent}>
          <i className='btn'>&#xe650;</i>
        </ProgressCircle>
        </div>
      <div className='iconfont'>&#xe640;</div>
      </IconsWrapper>
      {/* 在这里添加路由映射，: 是路由中的传值 */}
      {/* 不能用路由传值！！！因为只能传基本类型，不能传引用类型 */}
      {/* song 被传过去就变成了[object Object] */}

    </Container>
    </CSSTransition>
  )
}

// export default withRouter(React.memo (MiniPlayer))
export default React.memo(MiniPlayer)