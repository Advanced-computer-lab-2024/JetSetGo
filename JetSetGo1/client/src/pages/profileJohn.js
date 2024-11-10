import PersonalProfile from "../components/userDetails/userProfile.js"
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// JetSetGo\JetSetGo1\frontend\src\components\accountBox\signupForm.js
const ProfileJohn = () => {
    const userid = useParams();
    console.log(userid);
    return(
       <div className="Profile">
        <PersonalProfile userId={userid.id}/>
       </div>)
}

export default ProfileJohn;