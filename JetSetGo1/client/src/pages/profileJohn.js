import PersonalProfile from "../components/userDetails/userProfile.js"
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { userId } from '../components/accountBox/signupForm.js'

// JetSetGo\JetSetGo1\frontend\src\components\accountBox\signupForm.js
const ProfileJohn = () => {
    const userid = useParams();
    console.log("boboa:", userId);
    console.log(userid);
    return(
       <div className="Profile">
        <PersonalProfile userId={userid.id}/>
       </div>)
}

export default ProfileJohn;