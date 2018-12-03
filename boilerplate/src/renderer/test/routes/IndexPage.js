import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

class IndexPage extends React.Component {
  componentDidMount() {
    console.log('componentDidMount');
  }

  render() {
    return (
      <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      </div>
    );
  }
}

export default connect()(IndexPage);
