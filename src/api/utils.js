// 在这里存放一些与业务逻辑无关的辅助函数

export const getCount = (count) => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor (count / 10000) < 10000) {
    return Math.floor (count/1000)/10 + "万";
  } else  {
    return Math.floor (count / 10000000)/ 10 + "亿";
  }
}

// 处理数据，找出第一个没有歌名的排行榜的索引
export const filterIndex = rankList => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
};

// 处理歌手列表拼接歌手名字
export const getName = list => {
  let str = "";
  list.map ((item, index) => {
    // 很巧妙的名字拼接方法
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};

// 判断一个对象是否为空
// 防止在ajax数据收到前渲染页面，导致报错
export const isEmptyObject = obj => !obj || Object.keys (obj).length === 0;