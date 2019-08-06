import React, { Component } from 'react';
import style from './index.less';
//引入路由需要的组件
import { Link,Switch } from 'dva/router';
import SubRoutes,{ RedirectRoute, NoMacthRoute }from '../../utils/SubRoutes';


export default class extends Component {
    render() {
        const {routes,app} = this.props;
        return (
            <div>
                <p>联系我们</p>
                <div className={style.contact}>
                    <Link to="/about/contact/phone">电话</Link>
                    <Link to="/about/contact/address">地址</Link>
                </div>
                <div>
                    <Switch>
                        {
                            routes.map((route, i) => (
                            <SubRoutes key={i} {...route} app={app}/>
                            ))
                        }
                        <RedirectRoute exact={true} from={'/contact'} routes={routes} />
                    </Switch>
                </div>
            </div>
        )
    }
}