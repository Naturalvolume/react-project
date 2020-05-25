import React from 'react'
import {Container,SingerWrapper,IconsWrapper} from './style'
import {getName} from '../../api/utils'

function MiniPlayer(props) {
  const {song} = props
  
  return(
    <Container>
      <SingerWrapper>
        <div className='img-wrapper'>
          <img src={song.al.picUrl} alt='cover'></img>
        </div>
        <div className="title-wrapper">
          <div className="song">{song.name}</div>
          <div className='singer'>{getName(song.ar)}</div>
        </div>
      </SingerWrapper>
      <IconsWrapper>
      <div className='iconfont'>暂停</div>
      <div className='iconfont'>列表</div>
      </IconsWrapper>
    </Container>
  )
}
export default React.memo (MiniPlayer)