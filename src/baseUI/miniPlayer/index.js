import React from 'react'
import {Container,SingerWrapper,IconsWrapper} from './style'
import {getName} from '../../api/utils'
import {Route, withRouter} from 'react-router-dom'
import NormalPlayer from '../normalPlayer'

function MiniPlayer(props) {
  const {song} = props
  
  // const handlePlayer = () => {
  //   // 注意啦！！！没有用Route包裹的组件默认是没有props.history属性的！！
  //   // 所以这里需要一点技巧！！使用 withRouter 函数包裹这个组件，可以使用history了！！
  //   // ${} 是字面量表达式``中的传值
  //   props.history.push(`/player/${song}`)
  // }
  return(
    <Container>
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
      <div className='iconfont'>暂停</div>
      <div className='iconfont'>列表</div>
      </IconsWrapper>
      {/* 在这里添加路由映射，: 是路由中的传值 */}
      {/* 不能用路由传值！！！因为只能传基本类型，不能传引用类型 */}
      {/* song 被传过去就变成了[object Object] */}

    </Container>
  )
}
export default withRouter(React.memo (MiniPlayer))