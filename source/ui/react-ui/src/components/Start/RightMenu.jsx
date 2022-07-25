const isGood = (str, len) =>{
    if(str && str.length > 0 && str.length > len) return true;
    else return false;
}

const register = async () => 
{
    document.getElementById("create-db-name").onanimationend = ()=>{
        document.getElementById("create-db-name").style.animation = null;
    }

    document.getElementById("create-db-password").onanimationend = ()=>{
        document.getElementById("create-db-password").style.animation = null;
    }
    const db_name = document.getElementById("create-db-name").value
    const db_pass = document.getElementById("create-db-password").value
    const db_name_flag = isGood(db_name, 0)
    const db_pass_flag = isGood(db_pass, 7)
    if(db_name_flag && db_pass_flag){
        console.log(db_name, db_pass)
        const folderName = await window.pywebview.api.create_loading_folder_window();
        console.log(folderName)
        if(folderName)
        {
            const db_path = folderName + "/" + db_name + ".hpdb";
            console.log(db_path)
            let flag = await window.pywebview.api.create_database(db_path, db_name, db_pass);
            console.log(flag)
            if(flag){
                window.location.reload();
            }
            else{
                await window.pywebview.api.command("exit");
            }
        }
    }
    else{
        if(!db_name_flag) document.getElementById("create-db-name").style.animation = "shake 1s";
        if(!db_pass_flag)document.getElementById("create-db-password").style.animation = "shake 1s";
    }
}

const load = async () =>
{
    const file = await window.pywebview.api.create_loading_file_window();
    if(file){
        window.location.reload();
    }
}

const RightMenu = (props) =>{
    if(props.rightStatus.value==="create"){
        return (
            <div className="rightmenu-container">
                <div className="rightmenu-container-title">
                    <span>Create a new database</span>
                </div>
                <div className="rightmenu-container-content">
                    <div className="rightmenu-container-content-create">
                        <span>Database name</span>
                        <input id="create-db-name" placeholder="Database name" required spellCheck={false} autoComplete={"off"}></input>
                    </div>
                    <div className="rightmenu-container-content-create">
                        <span>Database password</span>
                        <input id="create-db-password" type={"password"} placeholder="Password" minLength={6} required></input>
                    </div>
                    <div className="rightmenu-container-content-create">
                        <button type="button" onClick={register}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
    else if(props.rightStatus.value==="load"){
        
        return (
            <div className="rightmenu-container">
                <div className="rightmenu-container-title">
                    <span>Load existing database</span>
                </div>
                <div className="rightmenu-container-content">
                    <div className="rightmenu-container-content-load">
                        <span onClick={load}>Select file...</span>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return <div className="rightmenu-container">
            <div className="rightmenu-container-title" style={{marginTop:"15%"}}>
                <span>Welcome!</span>
            </div>
        </div>
    }
}

export default RightMenu;