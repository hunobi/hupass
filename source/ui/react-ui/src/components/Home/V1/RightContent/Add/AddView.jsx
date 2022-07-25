import { Component } from "react";

import './addview.css'
import RandomIcon from '../../../../../assets/random.png';
import EyeIcon from '../../../../../assets/eye.png';

class AddView extends Component{
    constructor(){
        super();
    }

    generatePassword = async ()=>
    {
        const pswd = await window.pywebview.api.command("generate_password",{});
        document.getElementById("addview-password").value = pswd;
    }

    animationStart = (element) =>{
        element.onanimationend = () =>{
            element.style.animation = null;
        }
        element.style.animation = "shake 2s"
    }

    togglePassword = () =>{
        const password = document.getElementById("addview-password");
        if(password.type === "password"){
            password.type = "text"
        }
        else{
            password.type = "password"
        }
    }

    create = async ()=>{
        const name = document.getElementById("addview-name");
        const url = document.getElementById("addview-url");
        const login = document.getElementById("addview-login");
        const password = document.getElementById("addview-password");
        const notes = document.getElementById("addview-notes");

        if(name.value && url.value && login.value){
            const acc = this.props.Database.get.accounts;
            let flag = acc.find((item)=>{return item.name === name.value});
            if(flag!==undefined){this.animationStart(name);}
            else{
                if(password.value.length >= 8){
                    const data = {
                        name: name.value,
                        url: url.value,
                        login: login.value,
                        password: password.value,
                        notes: notes.value,
                        time_created: Date.now()*1000000,
                        time_updated: null,
                    };
                    const db = this.props.Database.get;
                    db.accounts.push(data);
                    this.props.Database.update(db);
                    this.props.changeView("list");
                }
                else{
                    this.animationStart(password);
                }
            }
        }
        else{
            if(!name.value)this.animationStart(name);
            if(!url.value)this.animationStart(url);
            if(!login.value)this.animationStart(login);
        }

    }

    render(){
        return (
            <div className="addview-container">
                <div className="addview-container-label">
                    <span className="addview-container-label-dbname">Database: {this.props.Database.get.metadata.db_name}</span>
                    <span className="addview-container-label-view">Add new record</span>
                </div>
                <div className="addview-container-content">
                    <div className="addview-container-content-element">
                        <label>Name</label>
                        <input id="addview-name" type={"text"} placeholder={"Record name"} spellCheck={false} autoComplete={"off"}></input>
                    </div>
                    <div className="addview-container-content-element">
                        <label>Website URL or domain</label>
                        <input id="addview-url" type={"text"} placeholder={"URL or domain address"} spellCheck={false} autoComplete={"off"}></input>
                    </div>
                    <div className="addview-container-content-element">
                        <label>Login</label>
                        <input id="addview-login" type={"text"} placeholder={"Login or e-mail or phone number or else"} spellCheck={false} autoComplete={"off"}></input>
                    </div>
                    <div className="addview-container-content-element">
                        <label>Password</label>
                        <input id="addview-password" type={"password"} placeholder={"Preferably more than 15 characters"}></input>
                        <div className="addview-container-content-element-icons">
                            <img onClick={this.generatePassword} src={RandomIcon} alt={"random"} title="Random password"></img>
                            <img onClick={this.togglePassword} src={EyeIcon} alt={"eye"} title="Hide/Show password"></img>
                        </div>
                    </div>
                    <div className="addview-container-content-element">
                        <label>Notes</label>
                        <textarea id="addview-notes" type={"text"} spellCheck={false} autoComplete={"off"}></textarea>
                    </div>
                    <div className="addview-container-content-element">
                        <button onClick={this.create} type={"button"}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddView;