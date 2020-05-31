import React from 'react'
import { getCount, getName} from '../../api/utils'
import {SongContainer, SongItem} from './style'
// 引入改变Player播放器的动作action
import { changePlayList, changeCurrentIndex, changeSequecePlayList } from './../../application/Player/store/actionCreators';
import { connect } from 'react-redux';


function SongList(props) {
  const {currentAlbum} = props
  const { changePlayListDispatch, changeCurrentIndexDispatch, changeSequecePlayListDispatch } = props;

  // 接受触发动画的函数，从列表
  const { musicAnimation } = props;
  // 选择歌曲，改变Player正在播放的歌曲，改变列表，添加动画
  const selectItem = (e, index) => {
    changePlayListDispatch(songs);
    changeSequecePlayListDispatch(songs);
    changeCurrentIndexDispatch (index);
    // 产生音符掉落动画
    musicAnimation (e.nativeEvent.clientX, e.nativeEvent.clientY);
  }
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
// 把dispatch Player的action映射到Singer组件中
const mapDispatchToProps = (dispatch) => {
  return {
    changePlayListDispatch (data){
      dispatch (changePlayList (data));
    },
    changeCurrentIndexDispatch (data) {
      dispatch (changeCurrentIndex (data));
    },
    changeSequecePlayListDispatch (data) {
      dispatch (changeSequecePlayList (data))
    }
  }
};
// 注意没有第一个参数要传入null，不能什么都不写
export default connect(null, mapDispatchToProps)(React.memo (SongList))


