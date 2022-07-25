import { Component } from "react";
import './settingsview.css';

class SettingsView extends Component{
    constructor(){
        super();
        this.state = {version_state: null, version_color: null} // "Up to date" or "Out to date"
    }

    componentDidMount = async ()=>{
        const storage = await window.pywebview.api.get_storage();
        if(storage.latest_db_version === storage.db.metadata.version){
            this.setState({version_state: "Up to date", version_color:"green"});
        }else{
            this.setState({version_state: "Out to date", version_color:"red"});
        }

    }

    animationStart = (element) =>{
        element.onanimationend = () =>{
            element.style.animation = null;
        }
        element.style.animation = "shake 2s"
      }

    updatePassword = async ()=>{
        const p_old = document.getElementById("setting_pass_old");
        const p_new1 = document.getElementById("setting_pass_new1");
        const p_new2 = document.getElementById("setting_pass_new2");

        if(p_new1 && p_new2 && (p_new1.value===p_new2.value) && (p_new1.value.length > 7)){
            if(p_old.value && await window.pywebview.api.command("settings_update_password",{old: p_old.value, new: p_new1.value})){
                p_old.value = "";
                p_new1.value = "";
                p_new2.value = "";
            }else{
                this.animationStart(p_old);
            }
        }
        else{
            this.animationStart(p_new1);
            this.animationStart(p_new2);
        }

    }

    render(){
        return (
            <div className="settingsview-container">
                <div className="settingsview-container-label">
                    <span className="settingsview-container-label-dbname">Database: {this.props.Database.get.metadata.db_name}</span>
                    <span className="settingsview-container-label-view">Settings</span>
                </div>
                <div className="settingsview-container-content">
                    <div className="settingsview-container-content-labels">
                        <div className="settingsview-container-content-labels-element"><span>Database version</span></div>
                        <div className="settingsview-container-content-labels-element"></div>
                        <div className="settingsview-container-content-labels-element">Change password</div>
                    </div>
                    <div className="settingsview-container-content-controls">
                        <div className="settingsview-container-content-controls-dbversion">
                            <div className="settingsview-container-content-controls-dbversion-label"><span className={this.state.version_color}>{this.state.version_state}</span></div>
                            <div className="settingsview-container-content-controls-submit"><button disabled={this.state.version_state==="Up to date"}>upgrade</button></div>
                        </div>
                        <div className="settingsview-container-content-controls-changepswd">
                            <div className="settingsview-container-content-controls-changepswd-input"><input id="setting_pass_old"  placeholder="Old password" type={"password"}></input></div>
                            <div className="settingsview-container-content-controls-changepswd-input"><input id="setting_pass_new1" placeholder="New password" type={"password"}></input></div>
                            <div className="settingsview-container-content-controls-changepswd-input"><input id="setting_pass_new2" placeholder="Repeat new password" type={"password"}></input></div>
                            <div className="settingsview-container-content-controls-submit"><button onClick={this.updatePassword}>Update password</button></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SettingsView;