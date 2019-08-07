import React from 'react';
import { Route,Redirect } from 'dva/router';
import NoMacth from '../components/NoMacth'
import dynamic from 'dva/dynamic';
import { connect } from 'dva';

//解决动态加载路由组件的方法
const dynamicComponent = (routes, app, models, component, isAuthority, userInfo) => 
dynamic({
  app,
  models: () => models,
  component: () => component().then(res => {
    // console.log(isAuthority)
    if (isAuthority) {
        //判断userInfo.id是否有内容
        if (!localStorage.users) {
            return () => <Redirect to='/login'/>
        }
    }
    const Component = res.default || res;
    return props => <Component {...props} app={app} routes={routes}/>
  }),
});

function SubRoutes({
    routes, 
    component, 
    app, 
    model,
    isAuthority,
    userInfo
}){
    // console.log(userInfo);
    return (
        <Route component={dynamicComponent(routes, app, model, component, isAuthority, userInfo)}/>
    )
}


export function RedirectRoute({routes, from, exact}){
   const routeR=routes.filter(item => {
       return item.redirect;
   })
   const to=routeR.length ? routeR[0].path : routes[0].path;
   return <Redirect exact={exact} from={from} to={to}/>
}

export function NoMacthRoute({status=404}){
    return (
        <Route 
            render={props => <NoMacth {...props} status={status} />}
        />
    )
 }

 //链接
 export default connect (({ example }) => ({
     userInfo: example.userInfo
 }))(SubRoutes)