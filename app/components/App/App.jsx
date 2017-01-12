import styles from './_App.scss';

import React from 'react';
import AppActions from '../../actions/AppActions';
import ItemsStore from '../../stores/ItemsStore';
import Footer from '../Footer/Footer';
import FolderTree from '../FolderTree'

function getAppState() {
  return {
    items: ItemsStore.getAll(),
    curr_dir: 'root'
  };
}

export default class App extends React.Component {

  state = getAppState()

  componentDidMount() {
    ItemsStore.addChangeListener(this.onChange);
    AppActions.getItems();
  }

  componentWillUnmount() {
    ItemsStore.removeChangeListener(this.onChange);
  }

  onChange = () => {
    this.setState(getAppState());
  }

  insertCallback(data){
      console.log("user callback for insert called",data);
  }
  updateCallback(data){
    console.log("user callback for update called",data);
  }
  deleteCallback(data){
    console.log("user callback for delete called",data);
  }
  folderNameValidator(enVal){
    return enVal.trim()!=="" && enVal.replace(/[a-zA-Z0-9\-_.]/g,"").length===0;
  }
  fileNameValidator(enVal){
    return enVal.trim()!=="" && enVal.replace(/[a-zA-Z0-9\-_.]/g,"").length===0;
  }
  updatePWD=(dir)=>{
    this.setState({curr_dir: dir});
  }
  render() {

    return (
      <div className={styles.app}>
       <h1 className={styles.header}>Folder Explorer</h1>
        <FolderTree.TreeBody
          folderData={this.state.items}
          showExColButton={false}
          insertCallback={this.insertCallback}
          deleteCallback={this.deleteCallback}
          updateCallback={this.updateCallback}
          folderNameValidator={this.folderNameValidator}
          fileNameValidator={this.fileNameValidator}
          updatePWD={this.updatePWD}
        />
        <Footer curr_dir={this.state.curr_dir}/>
      </div>
    );
  }
}
