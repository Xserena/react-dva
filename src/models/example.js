
export default {

  namespace: 'example',

  state: {
    userInfo: {
      email:null,
      pwd:null,
      key:null,
    }
  },

  subscriptions: {
   
  },

  effects: {
    //设置方法,dispatch(发出)信息
    *setUserInfo({ payload }, { call, put }) {  // payload:外部传递的数据
      yield put({ type: 'set_userinfo' });
    },
    // *getState({ param }, { call, put,select }) {  
    //   const userInfo = yield select((state)=>state.userInfo ) // 测试输出state
    //   return userInfo
    // }
  },

  reducers: {
    //设置用户信息:userInfo的state
    //把effects中通过setUserInfo拿到的payload信息赋值给state中的userInfo
    set_userinfo(state, { payload }) {
      return { ...state, userInfo: payload };
    },
    // *get_state({ param }, { call, put,select }) {  
    //   const userInfo = yield select((state)=>state.userInfo ) // 测试输出state
    //   return userInfo
    // }
  },
};
