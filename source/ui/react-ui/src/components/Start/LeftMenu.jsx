import './styles.css'
import CreateIcon from '../../assets/create.png'
import LoadIcon from '../../assets/load.png'

const LeftMenu = (props) =>{
    return (
        <div className="leftmenu-container">
            <div className="leftmenu-container-operation">
                <div className='leftmenu-container-operation-left' onClick={()=>props.rightStatus.set("create")}>
                    <img src={CreateIcon} alt="create icon"></img>
                    <p>Create database</p>
                </div>
            </div>
            <div className="leftmenu-container-operation">
                <div className='leftmenu-container-operation-right' onClick={()=>props.rightStatus.set("load")}>
                    <img src={LoadIcon} alt="load icon"></img>
                    <p>Load database</p>
                </div>
            </div>
        </div>
    )
}

export default LeftMenu;