import * as React from "react"
import styles from './index.css'

const NoteItem = (props) => {
  return (
    <div className={styles.note}>
      <span
        className={styles.del}
        onClick={() => props.handleDel()}>
        ✖
      </span>
      <div className={styles.noteContainer}>
        {props.value}
      </div>
      <div className={styles.noteBottom}></div>
    </div>
  )
}

export default NoteItem;