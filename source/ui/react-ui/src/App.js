import './App.css';
import Start from './views/Start';
import Home from './views/Home';
import React, {Component} from 'react';
import LoadingComponent from './components/Loading/LoadingComponent';

class App extends Component{
  constructor(){
    super();
    this.state = {filepath: null, pywebviewready: false}
  }

  
  loadAPI = async () => {
    const data = await window.pywebview.api.get_storage();
    this.setState({filepath: data.filepath, pywebviewready: true});
  }

  async componentDidMount(){
    window.addEventListener('pywebviewready',this.loadAPI);
    //const data = await window.pywebview.api.get_storage();
    //this.setState({filepath: data.filepath, pywebviewready: true});
  }

  async componentWillUnmount(){
    window.removeEventListener('pywebviewready',this.loadAPI);
    this.setState({filepath: null, pywebviewready: false});
  }

  render(){
    if(this.state.pywebviewready || window.pywebview !== undefined){
      if(this.state.filepath){
        return <Home filepath={this.state.filepath}></Home>
      }
      else{
        return <Start></Start>
      }
    }
    else{
      return <LoadingComponent></LoadingComponent>
    }
  }
}

export default App;
