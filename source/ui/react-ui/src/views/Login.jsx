import { Component } from "react";
import '../components/Login/styles.css';

// this.props.filepath
class Login extends Component
{
  constructor(){
    super();
    this.state = {}
  }

  animationStart = () =>{
    document.getElementById("auth-password").onanimationend = () =>{
        document.getElementById("auth-password").style.animation = null;
    }
    document.getElementById("auth-password").style.animation = "shake 2s"
  }

  verify = async () =>{
    const pass = document.getElementById("auth-password").value;
    if(pass){
        const flag = await window.pywebview.api.load_database(pass);
        if(flag){
          this.props.isLogged(true);
        }
        else{this.animationStart();}
    }
    else{
        this.animationStart(); 
    }
  }

  render(){
    return (
        <div className="auth-container">
            <div className="auth-container-title"><span>Authentication process</span></div>
            <div className="auth-container-form">
                <div className="auth-container-form-label"><span>Enter the database password</span></div>
                <div className="auth-container-form-input"><input id="auth-password" type={"password"} placeholder={"Your database password..."}></input></div>
                <div className="auth-container-form-submit"><button onClick={this.verify} type={"button"}>Verify</button></div>
            </div>
        </div>
    )
  }
}

export default Login;