import React from 'react';
import { Router, Switch } from 'dva/router';
// import IndexPage from './routes/IndexPage';
// import Home from './routes/Home';
// import About from './routes/About';
// import Admin from './routes/Admin';
// import Menus from './routes/Menus';
// import Login from './routes/User/Login';
// import Register from './routes/User/Register';
import SubRoutes from './utils/SubRoutes';

//私有路由开关
const isAuthority = true;

const RouteConfig = [
  {
    path:"/",
    // component: IndexPage,
    //优化：当要引入路由时在运行该文件
    component: () => import ("./routes/IndexPage"),
    model: [],
    routes: [
      {
        path:"/home",
        component: () => import ("./routes/Home"),
        redirect: true,
        model: [import('./models/home')],
        isAuthority
      },
      {
        path:"/about",
        component: () => import ("./routes/About"),
        model: [],
        isAuthority,
        routes: [
          {
            path:"/about/history",
            component: () => import ("./routes/About/History"),
            model: [],
          },
          {
            path:"/about/delivery",
            component: () => import ("./routes/About/Delivery"),
            model: [],
          },
          {
            path:"/about/contact",
            component: () => import ("./routes/About/Contact"),
            model: [],
            routes: [
              {
                path: "/about/contact/phone",
                component: () => import ("./routes/About/Phone"),
                model: [],
              },
              {
                path: "/about/contact/address",
                component: () => import ("./routes/About/Address"),
                model: [],
              },
            ]
          },
          {
            path:"/about/order",
            component: () => import ("./routes/About/Order"),
            model: [],
          },
        ]
      },
      {
        path:"/admin",
        component: () => import ("./routes/Admin"),
        model: [],
        isAuthority
      },
      {
        path:"/menus",
        component: () => import ("./routes/Menus"),
        model: [],
        isAuthority
      },
      {
        path:"/login",
        component: () => import ("./routes/User/Login"),
        model: [],
      },
      {
        path:"/register",
        component: () => import ("./routes/User/Register"),
        model: [],
      }
    ]
  }
]
function RouterConfig({ history, app }) {
  // console.log('router.js')
  // console.log(app);
  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/" component={IndexPage} /> */}
        {RouteConfig.map((route,i) => (
          //调用封装组件
          <SubRoutes key={i} {...route} app={app}/>
        ))}
      </Switch>
    </Router>
  );
}

export default RouterConfig;
