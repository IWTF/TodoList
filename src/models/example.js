
export default {

  namespace: 'example',

  state: {
    name: 'hzw',
    age: 3,
  },

  // 
  subscriptions: {
    setup ({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch ({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save (state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
