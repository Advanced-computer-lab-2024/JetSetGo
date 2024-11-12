// import { Link } from "react-router-dom"
import { useState } from "react"
import { useLocation } from 'react-router-dom';


//components 
// import HLTagelement from '../components/hltagcomponent.js'
import HLTagform from '../components/hltagform.js'
import HLTagelement from '../components/hltagcomponent.js'

const HLTags = () =>{
    const [ tags  ] = useState(null)
    const location = useLocation(); // Access the location object
    const { id } = location.state || {}; // Access id from state

   

    console.log("kokokokokok",tags);
     return(
        <div className="home">
            <div className="tags">
                {tags && tags.map((tag)=>(
                    // <p key={tag.tag_name}>{tag.tag_name}</p>
                    // <tagelement tag={tag}/>
                    <HLTagelement tag={tag}/>
                ))}
            </div>
            <HLTagform />
           
        </div>
     )
}


export default HLTags