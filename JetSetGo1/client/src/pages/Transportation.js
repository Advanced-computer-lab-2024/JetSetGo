// import { Link } from "react-router-dom"
import { useEffect , useState } from "react"


//components 
import Transportationform from '../components/TransportationForm.js';
import TransportationComponent from '../components/TransportationComponent.js';

const Transportationpage = () =>{
    const [ transports , get_transports ] = useState(null)

    useEffect (()=>{
        const fetchtransports = async () =>{
            const response = await fetch('http://localhost:8000/api/advertisers/showTransportation')
            const json = await response.json()
            if (response.ok){
                get_transports(json);
            }
        }
        fetchtransports()
    }, [])

    console.log("kokokokokok",transports);
     return(
        <div className="home">
            <div className="tags">
                {transports && transports.map((transport)=>(
                    // <p key={tag.tag_name}>{tag.tag_name}</p>
                    // <tagelement tag={tag}/>
                    <TransportationComponent transport={transport}/>
                ))}
            </div>
            <Transportationform/>
        </div>
     )
}


export default Transportationpage