import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import NavBar from './NavBar';
import { Layout } from 'antd';

//引入路由需要的组件
import { Switch } from 'dva/router';
import SubRoutes,{ RedirectRoute, NoMacthRoute }from '../utils/SubRoutes';

const { Header, Content } = Layout;
const { layout, header, content} = styles;

function IndexPage(props) {
  const { routes, app } = props;
  // console.log(props);
  return(
    <Layout className={layout}>
      <Header className={header}>
      <NavBar {...props}/>
      </Header>
      <Content className={content}>
        <Switch>
          {
            routes.map((route, i) => (
              <SubRoutes key={i} {...route} app={app}/>
            ))
          }
          <RedirectRoute exact={true} from={'/'} routes={routes} />
          <NoMacthRoute/>
        </Switch>
      </Content>
    </Layout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
