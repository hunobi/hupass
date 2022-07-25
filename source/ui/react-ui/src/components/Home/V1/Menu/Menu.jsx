import './menu.css';
import LogoIcon from '../../../../assets/logo.png';
import ListIcon from '../../../../assets/list.png';
import SettingsIcon from '../../../../assets/settings.ico'
import AddIcon from '../../../../assets/add.png';

const Menu = (props) => {
    const clickAction = (name) => {
        props.changeView(name);
    }
    return (
        <div className='menu-container'>
            <div className='menu-container-logo'><img src={LogoIcon} alt="logo"></img></div>
            <div className='menu-container-element'><img onClick={()=>{clickAction("list")}} src={ListIcon} alt="list"></img></div>
            <div className='menu-container-element'><img onClick={()=>{clickAction("settings")}} src={SettingsIcon } alt="settings"></img></div>
            {props.viewName ==="list" ? <div className='menu-container-element'><img onClick={()=>{clickAction("add")}} src={AddIcon} alt="add"></img></div> : null} 
            <div className='menu-container-version'><span>v1.0.0</span></div>
        </div>
    )
}

export default Menu;