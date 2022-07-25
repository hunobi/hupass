import LeftMenu from "../components/Start/LeftMenu";
import RightMenu from "../components/Start/RightMenu";
import { useState } from "react";


const Start = (props) =>
{
    const [rightStatus, setRightStatus] = useState(null)
    
    return (
        <div >
            <LeftMenu rightStatus={{value:rightStatus, set:setRightStatus}}></LeftMenu>
            <RightMenu rightStatus={{value:rightStatus, set:setRightStatus}}></RightMenu>
        </div>
      );
}

export default Start;