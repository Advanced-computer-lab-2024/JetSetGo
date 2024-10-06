// import { Link } from "react-router-dom"
import { useEffect , useState } from "react"


//components 
import Tourism_Governercomp from '../components/Tourism_Governercomp.js'
import Tourism_Governerform from '../components/Tourism_Governerform.js'

const Tourism_Governer = () =>{
    const [ Tourism_Governer , get_tags ] = useState(null)

    useEffect (()=>{
        const fetchtags = async () =>{
            const response = await fetch('http://localhost:8000/api/admin/')
            const json = await response.json()
            console.log("kokokokokok",response);
            if (response.ok){
                get_tags(json);
            }
        }
        fetchtags()
    }, [])

    console.log("kokokokokok",Tourism_Governer);
     return(
        <div className="home">
            <div className="tags">
                {Tourism_Governer && Tourism_Governer.map((Tourism_Governer)=>(
                    // <p key={tag.tag_name}>{tag.tag_name}</p>
                    // <tagelement tag={tag}/>
                    <Tourism_Governercomp tag={Tourism_Governer}/>
                ))}
            </div>
            <Tourism_Governerform/>
        </div>
     )
}


export default Tourism_Governer




// // import { Link } from "react-router-dom"
// import { useEffect , useState } from "react"


// //components 
// import Tourism_Governercomp from '../components/Tourism_Governercomp.js'
// import Tourism_Governerform from '../components/Tourism_Governerform.js'

// const Tourism_Governer = () =>{
//     const [ tags , get_tags ] = useState(null)

//     useEffect (()=>{
//         const fetchtags = async () =>{
//             const response = await fetch('http://localhost:8000/api/admin/')
//             const json = await response.json()
//             console.log("kokokokokok",response);
//             if (response.ok){
//                 get_tags(json);
//             }
//         }
//         fetchtags()
//     }, [])

//     console.log("kokokokokok",tags);
//      return(
//         <div className="home">
//             <div className="tags">
//                 {tags && tags.map((tag)=>(
//                     // <p key={tag.tag_name}>{tag.tag_name}</p>
//                     // <tagelement tag={tag}/>
//                     <Categoryelement tag={tag}/>
//                 ))}
//             </div>
//             <Categoryform/>
//         </div>
//      )
// }


// export default Categorypage