// import { Link } from "react-router-dom"
import { useEffect , useState } from "react"


//components 
import Tagelement from '../components/tagcomponent.js'
import Tagform from '../components/tagform.js'

const Tagspage = () =>{
    const [ tags , get_tags ] = useState(null)

    useEffect (()=>{
        const fetchtags = async () =>{
            const response = await fetch('http://localhost:8000/api/admin/tag')
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
                    <Tagelement tag={tag}/>
                ))}
            </div>
            <Tagform/>
        </div>
     )
}


export default Tagspage