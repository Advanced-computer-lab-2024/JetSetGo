// import { Link } from "react-router-dom"
import { useEffect , useState } from "react"
import { useLocation, useParams } from 'react-router-dom';


//components 
import Myitinerarieselement from '../components/myitinerariescomponent.js'

const Myitinerariespage = () =>{
    const [ tags , get_tags ] = useState(null)
    const location = useLocation(); // Access the location object
    const { id } = useParams(); // Access id from state


    useEffect (()=>{
        const fetchtags = async () =>{
            const response = await fetch(`http://localhost:8000/api/tour-guides/showAll?guideId=${id}`)
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