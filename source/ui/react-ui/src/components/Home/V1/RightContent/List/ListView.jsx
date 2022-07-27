import { Component } from "react";
import './listview.css';
import CopyLoginIcon from '../../../../../assets/copy-login.png'
import CopyPasswordIcon from '../../../../../assets/copy-password.png'
import DetailsIcon from '../../../../../assets/details.png'
const nsToDate = (ns)=>{
    let date = new Date(parseInt(ns/1000000));
    return date.toLocaleString();
}

const ListViewElement = (props) => {
    const openURL = (url) =>{
        if(url.indexOf("https://")===-1){url = "https://"+url}
        window.open(url,"_blank");
    }

    const copyData = async (data) =>{
        const element = document.createElement('input');
        element.style.display='none';
        element.value=data;
        element.select();
        element.setSelectionRange(0, data.length);
        navigator.clipboard.writeText(element.value);
    }

    return (
        <div className="listview-element-container">
            <div className="listview-element-container-name"><span>{props.value.name}</span></div>
            <div className="listview-element-container-url"><span onClick={()=>openURL(props.value.url)}>{props.value.url}</span></div>
            <div className="listview-element-container-operations">
                <img src={CopyLoginIcon} alt="copy-login" title="Copy login" onClick={()=>copyData(props.value.login)}></img>
                <img src={CopyPasswordIcon} alt="copy-password" title="Copy password" onClick={()=>copyData(props.value.password)}></img>
                <img src={DetailsIcon} alt="show-details" title="Show more info" onClick={()=>props.DetailsData.set(props.value)}></img>
            </div>
        </div>
    )
}

class ListView extends Component{
    render(){
       
        return (
        <div className="listview-container">
            <div className="listview-container-label">
                <span className="listview-container-label-dbname">Database: {this.props.Database.get.metadata.db_name}</span>
                <span className="listview-container-label-dbaccess">Login time: {nsToDate(this.props.Database.get.metadata.time_last_access)}</span>
            </div>
            <div className="listview-container-content">
                {this.props.Database.get.accounts.map((element) => {
                    return <ListViewElement key={element.time_created} value={element} DetailsData={this.props.DetailsData}></ListViewElement>
                })}
            </div>
        </div>
        );
    }
}


export default ListView;