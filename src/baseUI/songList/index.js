import React from 'react'
import { getCount, getName} from '../../api/utils'
import {SongContainer, SongItem} from './style'

function SongList(props) {
  const {currentAlbum} = props
  return(
    <SongContainer>
  <div className="first_line">
    <div className="play_all">
      <i className="iconfont">&#xe6e3;</i>
      <span > 播放全部 <span className="sum">(共 {currentAlbum.tracks.length} 首)</span></span>
    </div>
    <div className="add_list">
      <i className="iconfont">&#xe62d;</i>
      <span > 收藏 ({getCount (currentAlbum.subscribedCount)})</span>
    </div>
  </div>
  <SongItem>
    {
      currentAlbum.tracks.map ((item, index) => {
        return (
          <li key={index}>
            <span className="index">{index + 1}</span>
            <div className="info">
              <span>{item.name}</span>
              <span>
                { getName (item.ar) } - { item.al.name }
              </span>
            </div>
          </li>
        )
      })
    }
  </SongItem>
</SongContainer>
  )
}

export default React.memo (SongList)


