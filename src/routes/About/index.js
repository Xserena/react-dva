import React, { Component } from 'react';
import { Tabs } from 'antd';
import style from './index.less';

//引入路由需要的组件
import { Switch } from 'dva/router';
import SubRoutes,{ RedirectRoute }from '../../utils/SubRoutes';

const { TabPane } = Tabs

export default class extends Component {
    handleChangeTab = (key) => {
        this.props.history.push(key);
        // console.log(this.props.location.pathname)
    }
    render() {
        const { routes,app } = this.props;
        return (
            <div className={style.about}>

                <Tabs 
                tabPosition={'left'} 
                className={style.tabs} 
                onChange={this.handleChangeTab}
                activeKey={this.props.location.pathname}
                >
                    <TabPane tab="历史订餐" key="/about/history" />
                    <TabPane tab="联系我们" key="/about/contact" />
                    <TabPane tab="点餐文档" key="/about/order" />
                    <TabPane tab="快递信息" key="/about/delivery" />
                </Tabs>
                <div>
                <Switch className={style.routes}>
                    {
                        routes.map((route, i) => (
                        <SubRoutes key={i} {...route} app={app}/>
                        ))
                    }
                    <RedirectRoute exact={true} from={'/about'} routes={routes} />
                </Switch>
                </div>
            </div>
        )
    }
}