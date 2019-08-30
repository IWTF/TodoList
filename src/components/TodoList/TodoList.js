import * as React from "react"
import { connect } from 'dva';
import styles from './index.css'
import TodoItem from "../TodoItem/TodoItem";

// dispatch 会自动传入props中
class TodoList extends React.Component {
  constructor() {
    super();
    this.myRef = React.createRef()
    this.state = {
      showEidt: false,
      editClass: "",
    }
  }

  edit = (e) => {
    e.stopPropagation();

    this.setState({
      showEidt: true,
      editCon: styles.editCon,
    })
  }

  addList = () => {
    const val = this.input.value;
    console.log(val)
    this.props.dispatch({
      type: 'listitems/add',
      payload: val,
      callback: () => {
        this.setState({
          showEidt: false,
          editCon: "",
        });
        this.input.value = "";
      }
    })
  }

  handleEnterKey = (e) => {
    if (e.nativeEvent.keyCode === 13) {
      this.addList()
    }
  }

  handleClick = () => {
    this.setState({
      showEidt: false,
      editCon: "",
    })
  }

  deleteItem = (i) => {
    console.log("delete item is: ", i)
    this.props.dispatch({
      type: 'listitems/delete',
      payload: {
        itemType: 'todo',
        id: i
      }
    })
  }

  changeToDone = (i) => {
    console.log("done item is: ", i)
    this.props.dispatch({
      type: 'listitems/toDone',
      payload: i
    })
  }

  render () {
    return (
      <div className={styles.container} onClick={() => this.handleClick()}>
        <div className={styles.addSection} onClick={this.edit.bind(this)} hidden={this.state.showEidt}>ToDo</div>
        <div hidden={!this.state.showEidt} className={this.state.editCon}>
          <input
            onClick={(e) => { e.stopPropagation(); }}
            ref={input => this.input = input}
            onKeyPress={this.handleEnterKey}
            className={styles.editSection}
            placeholder="添加一个待办事务" />
          <span className={styles.editBtn} onClick={this.addList.bind(this)}>⏎</span>
        </div>
        <div onClick={() => this.handleClick()}>
          {this.props.todoItems.map((item, i) => (
            <TodoItem
              key={item}
              value={item}
              handleDone={() => this.changeToDone(i)}
              handleDel={() => this.deleteItem(i)} />
          ))}
        </div>
      </div>
    )
  }
}

/*
function StateToProps (state) {
    console.log("func params is: ", state)
return (
{props: state }
)
}
*/

// 或者进行解析，设置需要的数据到View
// 使用解析的原因，查看上个函数的打印就知道了
function StateToProps ({ listitems }) {
  return ({
    todoItems: listitems.todoLists
  })
}
// connect接收一个 stateToProps 的函数
// 参数名对应要导入的仓库的namespace
export default connect(StateToProps)(TodoList);

// 此时，可以进行以下操作
// 书写参数的类型 以及 是否必需
// IndexPage.propTypes = {
//   name: PropTypes.string,
//   age: PropTypes.number,
// };