
export default {
  namespace: 'listitems',
  state: {
    todoLists: ['kuai', 'fadsfa'],
    doneLists: ['aaaaaaa', 'bbbbbbbb'],
  },
  reducers: {
    addTodo (state, { payload }) {
      console.log("excute add func", payload)
      let todoLists = state.todoLists
      todoLists.push(payload)
      return {
        ...state,
        todoLists,
      }
    },
    delTodo (state, { payload }) {
      console.log("excute del func", payload)
      let todoLists = state.todoLists
      todoLists.splice(payload, 1)
      return {
        ...state,
        todoLists,
      }
    },
    /* 
    在同页面内，Done组件并不重新渲染
    原因是 ES6 的解构赋值属于浅拷贝，connect在处理props变化时只是浅处理，所有并没有记录变化
    换用 JSON.parse(JSON.stringfy()), **深拷贝**
    let doneLists = state.doneLists

    doneLists.push(todoLists.splice(payload, 1)[0])
    console.log('after change, donelists:', JSON.parse(JSON.stringify(doneLists)))

    let tmp = {
    ...state,
    todoLists: state.todoLists.filter(s=> s!== payload),
    doneLists: state.doneLists.concat(todoLists.splice(payload, 1)),
    }
    return JSON.parse(JSON.stringify(tmp))
    */

    // 另一种方法，
    todoToDone (state, { payload }) {
      console.log("excute ToDone func", payload)

      // 关键在于，尝试一个新的数组对象  **slice()产生新的数组**
      // 之前不渲染的原因，是因为：临时的todolists/donelists浅拷贝，返回时仍是原state对象
      // 而connect对于 props 也是浅比较，若什么什么(...不清楚到底怎么说)没变就不渲染 
      let todoLists = state.todoLists.slice()
      let doneLists = state.doneLists.slice()

      doneLists.push(todoLists.splice(payload, 1))

      return {
        ...state,
        todoLists,
        doneLists,
      }
    }
  },
  // 这里应该调用接口，更改数据库，不过练手项目就省略了
  effects: {
    *add ({ payload, callback }, { put }) {
      yield put({
        type: 'addTodo',
        payload: payload
      });
      if (callback) {
        callback();
      }
    },
    *delete ({ payload, callback }, { put }) {
      const { itemType, id } = payload;
      if (itemType === 'todo') {
        yield put({
          type: 'delTodo',
          payload: id,
        })
      } else {
        yield put({
          type: 'delDone',
          payload: id,
        })
      }
      if (callback) {
        callback();
      }
    },
    *toDone ({ payload, callback }, { put }) {
      yield put({
        type: 'todoToDone',
        payload: payload,
      })
      if (callback) {
        callback();
      }
    }
  }
}