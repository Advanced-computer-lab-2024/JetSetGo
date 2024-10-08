// import { Link } from "react-router-dom"
import { useState } from "react"


//components 
// import HLTagelement from '../components/hltagcomponent.js'
import HLTagform from '../components/hltagform.js'

const HLTags = () =>{
    const [ tags  ] = useState(null)

   

    console.log("kokokokokok",tags);
     return(
        <div className="home">
            <div className="tags">
                {/* {tags && tags.map((tag)=>(
                    // <p key={tag.tag_name}>{tag.tag_name}</p>
                    // <tagelement tag={tag}/>
                    <HLTagelement tag={tag}/>
                ))} */}
            </div>
            <HLTagform/>
        </div>
     )
}


export default HLTags