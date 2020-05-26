import React from "react";
import {  getName } from "../../api/utils";
import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
} from "./style";

function NormalPlayer (props) {
  const song = {
    al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
    name: "木偶人",
    ar: [{name: "薛之谦"}]
  }
  
  // console.log(props.match.params.song)
  // 输出 [object Object] 所以不能用路由传引用类型
  return (
    <NormalPlayerContainer>
      <div className="background">
        <img
          src={song.al.picUrl + "?param=300x300"}
          width="100%"
          height="100%"
          alt="歌曲图片"
        />
      </div>
      {/* 为啥要用两次 background 类 */}
      <div className="background layer"></div>
      <Top className="top">
        <div className="back">
          <i className="iconfont icon-back">&#xe662;</i>
        </div>
        <h1 className="title">{song.name}</h1>
        <h1 className="subtitle">{getName (song.ar)}</h1>
      </Top>
      <Middle>
        <CDWrapper>
          <div className="cd">
            <img
              className="image play"
              src={song.al.picUrl + "?param=400x400"}
              alt=""
            />
          </div>
        </CDWrapper>
      </Middle>
      <Bottom className="bottom">
        <Operators>
          <div className="icon i-left" >
            <i className="iconfont">&#xe625;</i>
          </div>
          <div className="icon i-left">
            <i className="iconfont">&#xe6e1;</i>
          </div>
          <div className="icon i-center">
            <i className="iconfont">&#xe723;</i>
          </div>
          <div className="icon i-right">
            <i className="iconfont">&#xe718;</i>
          </div>
          <div className="icon i-right">
            <i className="iconfont">&#xe640;</i>
          </div>
        </Operators>
      </Bottom>
    </NormalPlayerContainer>
  );
}
export default React.memo (NormalPlayer);