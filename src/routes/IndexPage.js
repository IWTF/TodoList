import React from 'react';
import TodoList from '../components/TodoList/TodoList'
import DoneList from '../components/DoneList/DoneList'
import NoteList from '../components/NoteList/NoteList'
import styles from './index.css'

function IndexPage () {
  console.log("IndexPage ===================")
  return (
    <div className={styles.IndexPage}>
      <h1 className={styles.title}>TodoList</h1>
      <div className={styles.top}>
        <TodoList />
        <DoneList />
      </div>
      <NoteList />
    </div>
  );
}

export default IndexPage;
