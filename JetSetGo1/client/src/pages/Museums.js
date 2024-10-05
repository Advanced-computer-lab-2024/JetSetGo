//import { Link } from "react-router-dom"
import { useEffect , useState } from "react"


//components 
import CUMuseums from '../components/CUMuseums.js'
import RDMuseums from '../components/RDMuseums.js'

const MuseumsPage = () =>{
    const [ museums , get_museums ] = useState(null)

    useEffect (()=>{
        const fetchmuseums = async () =>{
            const response = await fetch('/api/tourism-governer/getMuseum')
            const json = await response.json()
            console.log("kokokokokok",response);
            if (response.ok){
                get_museums(json);
            }
        }
        fetchmuseums()
    }, [])

    console.log("kokokokokok",museums);
     return(
        <div className="home">
            <div className="tags">
                {museums && museums.map((museum)=>(
                    // <p key={tag.tag_name}>{tag.tag_name}</p>
                    // <tagelement tag={tag}/>
                    <RDMuseums museum={museum}/>
                ))}
            </div>
            <CUMuseums/>
        </div>
     )
}

export default MuseumsPage