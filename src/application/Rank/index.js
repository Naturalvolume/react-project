// import React, {useEffect} from 'react';
// import {Content, GovernmentContainer, ItemList} from './style'
// import Scroll from '../../components/scroll'
// import { filterIndex } from '../../api/utils';

// function Rank() {
//   const { rankList:list, loading } = props;
//   const { getRankListDataDispatch } = props;
//   let rankList = list ? list.toJS () : [];
//   // 这部分官方榜和全球榜的数据需要手动分开
//   let globalStartIndex = filterIndex (rankList);
//   let officialList = rankList.slice (0, globalStartIndex);
//   let globalList = rankList.slice (globalStartIndex);

//   useEffect (() => {
//     getRankListDataDispatch ();
//   }, []);

//   return(
//     <Content>
//       <Scroll>
//       <GovernmentContainer>
//         <div className={title}>
//           {
//             RandList.map((item, index) => {
//               return(
//                 <ItemList key={index}>
//                   <div className='imgContainer'>
//                     {/* 注意了！！图像标签是 <img> 而不是<image> */}
//                     {/* 注意啦！！给图片增加性质时，要用代码符号包裹，在代码符号中取对象值时，要用${} 符号包裹 */}
//                     <div className='mask'></div>
//                     <img src={`${item.picUrl}?param=300x300`} alt='cover'></img>
//                     <span>{item.time}</span>
//                   </div>
//                   <div className='listContainer'>
//                     <span>{item.text1}</span>
//                     <span>{item.text2}</span>
//                     <span>{item.text3}</span>
//                   </div>
//                 </ItemList>
//               )          
//             })
//           }
//         </div>
//       </GovernmentContainer>
//       </Scroll>
//     </Content>
//   ) 
// } 
// const mapStateToProps = (state) => ({
//   rankList: state.getIn (['rank', 'rankList']),
//   loading: state.getIn (['rank', 'loading']),
// });
// // 映射 dispatch 到 props 上
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getRankListDataDispatch () {
//       dispatch (getRankList ());
//     }
//   }
// };

// export default connect (mapStateToProps, mapDispatchToProps)(React.memo (Rank));