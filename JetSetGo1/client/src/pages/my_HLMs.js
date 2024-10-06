// import { Link } from "react-router-dom"
import { useEffect , useState } from "react"


//components 
import HLMselement from '../components/HLMscomponent.js'

const HLMSpage = () =>{
    const [ tags , get_tags ] = useState(null)

    useEffect (()=>{
        const fetchtags = async () =>{
            const response = await fetch('http://localhost:4000/api/tourism-governer/showAll?govId=67000cb1df7b256d80587f8a')
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
                    <HLMselement tag={tag}/>
                ))}
            </div>
        </div>
     )
}


export default HLMSpage