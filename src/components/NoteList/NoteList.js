import * as React from "react"
import { connect } from 'dva';
import styles from './index.css'
import NoteItem from '../NoteItem/NoteItem'

class NoteList extends React.Component {
  constructor() {
    super();
    this.state = {
      btnValue: "添加",
      showText: false,
    }
  }

  handleEdit = () => {
    this.setState({ showText: true })
  }

  handleAdd = () => {
    console.log('add', this.textarea.value)
    this.setState({ showText: false })
    let textVal = this.textarea.value
    this.props.dispatch({
      type: 'noteitems/add',
      payload: textVal,
    })
  }

  noteDel (i) {
    console.log("NoteList del function: ", i)
    this.props.dispatch({
      type: 'noteitems/delete',
      payload: i,
    })
  }

  render () {
    return (
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles.title1}>便</div>
          <div className={styles.title2}>签</div>
        </div>
        <div className={styles.content}>
          {this.props.noteLists.map((item, i) => (
            <NoteItem
              key={item}
              value={item}
              handleDel={() => this.noteDel(i)} />
          ))}
        </div>
        <div className={styles.rightSection}>
          <span className={styles.rightBtn} onClick={() => {
            if (this.state.btnValue === "添加") {
              this.setState({ btnValue: "确定" })
              this.handleEdit()
            } else {
              this.setState({ btnValue: "添加" })
              this.handleAdd()
            }
          }}>{this.state.btnValue}</span>
        </div>
        <span
          className={styles.rightBtn}
          hidden={!this.state.showText}
          onClick={() => this.setState({ showText: false, btnValue: "添加" })}>
          取消
        </span>
        <textarea
          className={styles.noteText}
          style={{ display: this.state.showText ? "block" : "none" }}
          ref={textarea => this.textarea = textarea}
        ></textarea>
      </div>
    )
  }
}

function stateToProps ({ noteitems }) {
  return ({
    noteLists: noteitems.noteLists
  })
}
export default connect(stateToProps)(NoteList);