import { Component } from "react";
import Login from './Login'
import LoadingComponent from "../components/Loading/LoadingComponent";

import Version_1 from "../components/Home/V1/Version_1";

// this.props.filepath
class Home extends Component
{
  constructor(){
    super();
    this.state = {isLogged: false, db: null}  // WARNING !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  }
  async componentDidMount(){
    const { db } = await window.pywebview.api.get_storage();
    this.setState({db: db});
  }

  async componentWillUnmount(){
    this.setState({isLogged: false, db: null});
  }

  update = async (data) =>{
    await window.pywebview.api.update_database(data);
    this.setState({db: data});
  }

  setLoginStatus = async (flag) => {
    if(flag){
      const { db } = await window.pywebview.api.get_storage();
      this.setState({isLogged: flag, db: db});
    }
    else{
      this.setState({isLogged: flag, db: null});
    }
  }

  render(){
    if(this.state.isLogged){
      if(this.state.db){
        const version = this.state.db.metadata.version;
        if(version === 1){
          return <Version_1 Database = {{get: this.state.db, update: this.update}}></Version_1>
        }
        else{
          return <LoadingComponent></LoadingComponent>
        }
      }
      else{
        return <LoadingComponent></LoadingComponent>
      }
    }else{
      return <Login isLogged={this.setLoginStatus}></Login>
    }
  }
}

export default Home;