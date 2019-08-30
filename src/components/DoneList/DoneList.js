import * as React from "react"
import { connect } from 'dva'
import styles from './index.css'
import TodoItem from "../TodoItem/TodoItem";

class DoneList extends React.PureComponent {

  render () {
    console.log("done list : ", this.props)
    return (
      <div className={styles.container}>
        <div className={styles.titleSection}>Done</div>
        <div>
          {this.props.doneItems.map((item, i) => (
            <TodoItem
              key={item}
              value={item}
              done={true} />
          ))}
        </div>
      </div>
    )
  }
}

function StateToProps ({ listitems }) {
  return ({
    doneItems: listitems.doneLists
  })
}
export default connect(StateToProps)(DoneList);