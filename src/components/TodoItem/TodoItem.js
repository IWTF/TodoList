import * as React from "react"
import styles from './index.css'

/* SFC, 无状态功能组件

组件的props

done: 决定item样式，done: true表示在Donelist卡片中
value: item渲染的文本
handleDel: 处理删除事件
handleDone: 处理TodoList中，点击完成 移至 DoneList

*/
const TodoItem = (props) => {
  const { done = false } = props;
  let doneClass = "";
  if (done) {
    doneClass = styles.donIcon;
  }
  return (
    <div className={styles.item}>
      <span
        className={`${styles.itemIcon} ${doneClass}`}
        onClick={() => {
          if (!done)
            props.handleDone()
        }}>
      </span>
      <span>{props.value}</span>
      <span
        style={{ display: done ? 'none' : '' }}
        className={styles.trach}
        onClick={() => props.handleDel()}>
        🗑
      </span>
    </div>
  )
}

export default TodoItem;