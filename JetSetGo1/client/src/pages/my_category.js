// import { Link } from "react-router-dom"
import { useEffect , useState } from "react"


//components 
import Categoryelement from '../components/categorycomponent.js'
import Categoryform from '../components/categoryform.js'

const Categorypage = () =>{
    const [ tags , get_tags ] = useState(null)

    useEffect (()=>{
        const fetchtags = async () =>{
            const response = await fetch('http://localhost:8000/api/admin/category')
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
                    <Categoryelement tag={tag}/>
                ))}
            </div>
            <Categoryform/>
        </div>
     )
}


export default Categorypage