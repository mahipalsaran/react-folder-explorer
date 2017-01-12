import styles from './_Footer.scss';
import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className={styles.footer}>
        PWD : {this.props.curr_dir}
      </footer>
    );
  }
}
