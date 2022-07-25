import { Component } from "react";
import './version.css';

import Menu from "./Menu/Menu";
import ListView from "./RightContent/List/ListView";
import SettingsView from "./RightContent/Settings/SettingsView";
import DetailsView from "./RightContent/Details/DetailsView";
import LoadingComponent from "../../Loading/LoadingComponent";
import AddView from "./RightContent/Add/AddView";

class Version_1 extends Component{
    constructor(){
        super();
        this.state = {view: "list", detailsData: null}
    }

    setView = (view) => {
        if(view !== this.state.view){
            this.setState({view: view});
        }
    }

    setDetailData = (data) => {
        
        this.setState({view: "details", detailsData: data});
    }
/*
    componentDidMount = async () =>{
       
    }

    componentWillUnmount = async ()=>{
        this.state = {view: "list", detailsData: null}
    }
*/
    render(){
        let Content = ListView;
        if(this.state.view === "settings"){
            Content = SettingsView;
        }
        else if( this.state.detailsData && this.state.view === "details"){
            Content = DetailsView;
        }
        else if(this.state.view === "add"){
            Content = AddView;
        }    
        
        if(Content){
            return(
                <div className="version-container">
                    <div className="version-container-menu"><Menu viewName = {this.state.view} changeView = {this.setView} version={this.props.Database.get.metadata.version}></Menu></div>
                    <div className="version-container-content"><Content Database = {{get: this.props.Database.get, update: this.props.Database.update}} DetailsData={{value:this.state.detailsData, set: this.setDetailData}} changeView = {this.setView} ></Content></div>
                </div>
            )
        }
        else{
            return <LoadingComponent></LoadingComponent>
        }
    }
}

export default Version_1