import React, {useState, useEffect, useCallback} from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container } from './style';
import SearchBox from '../../baseUI/search-box'

function Search (props) {
  // 控制动画
  const [show, setShow] = useState (false);
  useEffect (() => {
    setShow (true);
  }, []);
  
  return (
    <CSSTransition
    // in的属性为false就执行返回动画
    in={show}
    timeout={300}
    appear={true}
    classNames="fly"
    unmountOnExit
    // 离开时执行这个函数
    onExited={() => props.history.goBack()}
  >
    <Container>
      <div onClick={() => (setShow(false))}> 返回 </div>
    </Container>
  </CSSTransition>
  )
}

export default Search;