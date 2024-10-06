// import { Link } from "react-router-dom"
import { useEffect , useState } from "react"


//components 
import Myitinerarieselement from '../components/myitinerariescomponent.js'

const Myitinerariespage = () =>{
    const [ tags , get_tags ] = useState(null)

    useEffect (()=>{
        const fetchtags = async () =>{
            const response = await fetch('http://localhost:4000/api/tour-guides/showAll?guideId=67002c827e9690cf35059882')
            const json = await response.json()
            console.log("kokokokokok",response);
            if (response.ok){
                get_tags(json);
            }
        }
        fetchtags()
    }, [])

    console.log("kokokokokok",tags);
     return(
        <div className="home">
            <div className="tags">
                {tags && tags.map((tag)=>(
                    // <p key={tag.tag_name}>{tag.tag_name}</p>
                    // <tagelement tag={tag}/>
                    <Myitinerarieselement tag={tag}/>
                ))}
            </div>
        </div>
     )
}


export default Myitinerariespage