import React from 'react';
import { connect } from 'dva'
import style from './index.less';

const { home, background } = style;
function index (props){
    return (
        <div className={home}>
            <div className={background}>
                <h1>Welcome to pizza!</h1>
                <p>{props.text}</p>
            </div>
        </div>
    )
}

//关联home.js(model)和当前组件index.js(Home)
export default connect ( ({home})  => ({ ...home }))(index)