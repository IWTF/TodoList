export default {
  namespace: 'noteitems',
  state: {
    noteLists: ['我偷偷的告诉你，有一个地方叫做稻城，我要和我最心爱的人一起去那里，看蔚蓝的天空，看白色的雪山，看金色的草地，看一场秋天的童话。我要告诉她，如果没有住在你的心里，都是客死他乡！我要告诉她，相爱这件事情，就是永远在一起。']
  },
  reducers: {
    addNote (state, { payload }) {
      let noteLists = state.noteLists.slice()
      noteLists.push(payload)
      return {
        ...state,
        noteLists,
      }
    },
    delNote (state, { payload }) {
      let noteLists = state.noteLists.slice()
      noteLists.splice(payload, 1)
      return {
        ...state,
        noteLists,
      }
    },
  },
  effects: {
    *add ({ payload, callback }, { put }) {
      yield put({
        type: 'addNote',
        payload: payload
      });
      if (callback) {
        callback();
      }
    },
    *delete ({ payload, callback }, { put }) {
      yield put({
        type: 'delNote',
        payload: payload,
      })
      if (callback) {
        callback()
      }
    },
  }
}