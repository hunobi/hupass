import { Component } from "react";

import './detailsview.css'
import RandomIcon from '../../../../../assets/random.png';
import EyeIcon from '../../../../../assets/eye.png';

class DetailsView extends Component{
    constructor(){
        super();
    }

    componentDidMount = async () =>{
        document.getElementById("detailsview-name").value = this.props.DetailsData.value.name;
        document.getElementById("detailsview-url").value = this.props.DetailsData.value.url;
        document.getElementById("detailsview-login").value = this.props.DetailsData.value.login;
        document.getElementById("detailsview-password").value = this.props.DetailsData.value.password;
        document.getElementById("detailsview-notes").value = this.props.DetailsData.value.notes;
        
    }

    generatePassword = async ()=>
    {
        const pswd = await window.pywebview.api.command("generate_password",{});
        document.getElementById("detailsview-password").value = pswd;
    }

    animationStart = (element) =>{
        element.onanimationend = () =>{
            element.style.animation = null;
        }
        element.style.animation = "shake 2s"
    }

    togglePassword = () =>{
        const password = document.getElementById("detailsview-password");
        if(password.type === "password"){
            password.type = "text"
        }
        else{
            password.type = "password"
        }
    }

    create = async ()=>{
        const name = document.getElementById("detailsview-name");
        const url = document.getElementById("detailsview-url");
        const login = document.getElementById("detailsview-login");
        const password = document.getElementById("detailsview-password");
        const notes = document.getElementById("detailsview-notes");

        if(name.value && url.value && login.value){
            if(name.value !== this.props.DetailsData.value.name){
                const acc = this.props.Database.get.accounts;
                let flag = acc.find((item)=>{return item.name === name.value});
                if(flag!==undefined){this.animationStart(name); return;}
            }

            if(password.value.length >= 8){
                const data = {
                    name: name.value,
                    url: url.value,
                    login: login.value,
                    password: password.value,
                    notes: notes.value,
                    time_created: this.props.DetailsData.value.time_created,
                    time_updated: Date.now()*1000000,
                };
                const db = this.props.Database.get;
                let num = null;
                db.accounts.find((item, index)=>{
                    if(item.name === this.props.DetailsData.value.name){
                        num = index;
                    }
                })
                db.accounts[num] = data;
                this.props.Database.update(db);
                this.props.changeView("list");
            }
            else{
                this.animationStart(password);
            }
        }
        else{
            if(!name.value)this.animationStart(name);
            if(!url.value)this.animationStart(url);
            if(!login.value)this.animationStart(login);
        }

    }

    delete = ()=>{
        const name = this.props.DetailsData.value.name;
        const acc = this.props.Database.get.accounts;
        let num = null;
        acc.find((item, index)=>{
            if(item.name === name){
                num = index;
            }
        });
        const db = this.props.Database.get;
        db.accounts.splice(num, 1);
        this.props.Database.update(db);
        this.props.changeView("list");

    }

    render(){
        return (
            <div className="detailsview-container">
                <div className="detailsview-container-label">
                    <span className="detailsview-container-label-dbname">Database: {this.props.Database.get.metadata.db_name}</span>
                    <span className="detailsview-container-label-view">Details of {this.props.DetailsData.value.name}</span>
                </div>
                <div className="detailsview-container-content">
                    <div className="detailsview-container-content-element">
                        <label>Name</label>
                        <input id="detailsview-name" type={"text"} placeholder={"Record name"} spellCheck={false} autoComplete={"off"}></input>
                    </div>
                    <div className="detailsview-container-content-element">
                        <label>Website URL or domain</label>
                        <input id="detailsview-url" type={"text"} placeholder={"URL or domain address"} spellCheck={false} autoComplete={"off"}></input>
                    </div>
                    <div className="detailsview-container-content-element">
                        <label>Login</label>
                        <input id="detailsview-login" type={"text"} placeholder={"Login or e-mail or phone number or else"} spellCheck={false} autoComplete={"off"}></input>
                    </div>
                    <div className="detailsview-container-content-element">
                        <label>Password</label>
                        <input id="detailsview-password" type={"password"} placeholder={"Preferably more than 15 characters"}></input>
                        <div className="detailsview-container-content-element-icons">
                            <img onClick={this.generatePassword} src={RandomIcon} alt={"random"} title="Random password"></img>
                            <img onClick={this.togglePassword} src={EyeIcon} alt={"eye"} title="Hide/Show password"></img>
                        </div>
                    </div>
                    <div className="detailsview-container-content-element">
                        <label>Notes</label>
                        <textarea id="detailsview-notes" type={"text"} spellCheck={false} autoComplete={"off"}></textarea>
                    </div>
                    <div className="detailsview-container-content-element">
                        <button onClick={this.create} type={"button"}>Submit</button>
                        <button className="detailsview-button-red" onClick={this.delete} type={"button"}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailsView;