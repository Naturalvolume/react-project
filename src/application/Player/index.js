import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  changePlayingState,
  changeShowPlayList,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changePlayMode,
  changeFullScreen
} from "./store/actionCreators";
import MiniPlayer from '../../baseUI/miniPlayer'
import NormalPlayer from '../..//baseUI/normalPlayer'

// 播放器采用动画切换，当fullScreen为false时，显示小播放器；为true时，显示全屏播放器
function Player (props) {
  // 父元素从redux中拿到状态再传给子元素，相当于状态提升
  const { fullScreen } = props;
  const { toggleFullScreenDispatch } = props;

  const currentSong = {
    al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
    name: "木偶人",
    ar: [{name: "薛之谦"}]
  }
  return (
    <div>
      {/* 小播放器和全屏播放器都是它的子组件，具体显示哪一个由 props.fullScreen决定 */}
      <MiniPlayer 
        song={currentSong}
        fullScreen={fullScreen}
        toggleFullScreen={toggleFullScreenDispatch}/>
      <NormalPlayer song={currentSong}
        fullScreen={fullScreen}
        toggleFullScreen={toggleFullScreenDispatch}/>
    </div>
  )
}

const mapStateToProps = state => ({
  fullScreen: state.getIn (["player", "fullScreen"]),
  playing: state.getIn (["player", "playing"]),
  currentSong: state.getIn (["player", "currentSong"]),
  showPlayList: state.getIn (["player", "showPlayList"]),
  mode: state.getIn (["player", "mode"]),
  currentIndex: state.getIn (["player", "currentIndex"]),
  playList: state.getIn (["player", "playList"]),
  sequencePlayList: state.getIn (["player", "sequencePlayList"])
});

// 映射 dispatch 到 props 上
const mapDispatchToProps = dispatch => {
  return {
    togglePlayingDispatch (data) {
      dispatch (changePlayingState (data));
    },
    toggleFullScreenDispatch (data) {
      dispatch (changeFullScreen (data));
    },
    togglePlayListDispatch (data) {
      dispatch (changeShowPlayList (data));
    },
    changeCurrentIndexDispatch (index) {
      dispatch (changeCurrentIndex (index));
    },
    changeCurrentDispatch (data) {
      dispatch (changeCurrentSong (data));
    },
    changeModeDispatch (data) {
      dispatch (changePlayMode (data));
    },
    changePlayListDispatch (data) {
      dispatch (changePlayList (data));
    }
  };
};

// 将 ui 组件包装成容器组件
export default connect (
  mapStateToProps,
  mapDispatchToProps
)(React.memo (Player));