import React, {useState} from 'react';
import {Container} from './style';
// 引入动画插件
import { CSSTransition } from 'react-transition-group';

function Album (props) {
  const [showStatus, setShowStatus] = useState (true);
  return (
    // 让进场动画包裹在外层
    <CSSTransition
      in={showStatus}  
      timeout={300} 
      classNames="fly" 
      appear={true} 
      unmountOnExit
      onExited={props.history.goBack}
    >
    <Container>
      
    </Container>
    </CSSTransition>
  )
}

export default Album;