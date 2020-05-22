import React from 'react'
import {Top} from './style'

function Abc(props) {
  const {currentAlbum} = props
  return(
    <Top background={currentAlbum.coverImgUrl}>
      {/* <div className="background">
        <div className="filter"></div>
      </div>
      <div className="img_wrapper">
        <div className="decorate"></div>
        <img src={currentAlbum.coverImgUrl} alt=""/>
        <div className="play_count">
          <i className="iconfont play">&#xe885;</i>
          <span className="count">{Math.floor (currentAlbum.subscribedCount/1000)/10} 万 </span>
        </div>
      </div>
      <div className="desc_wrapper">
        <div className="title">{currentAlbum.name}</div>
        <div className="person">
          <div className="avatar">
            <img src={currentAlbum.creator.avatarUrl} alt=""/>
          </div>
          <div className="name">{currentAlbum.creator.nickname}</div>
        </div>
      </div> */}
    </Top>
  )
}

export default Abc;