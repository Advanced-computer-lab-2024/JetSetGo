import { Link } from "react-router-dom"
// import { useEffect , useState } from "react"


//components 
// import Tagelement from '../components/tagcomponent.js'
// import Tagform from '../components/tagform.js'

const Home = () =>{
 
     return(
        <div className="home">
            <div className="tags">
                <Link to='/my_tags'>My Tags</Link>
                <br/>
                <Link to='/my_category'>My category</Link>
                <br/>
                <Link to='/Tourism_Governer'>Tourism_Governer</Link>
                <br/>
                <br/>
                <br/>
                <Link to='/HL'>HistoricalLocation</Link>
                <br/>
                <Link to='/Museum'>Museum</Link>
                <br/>
                <Link to='/HLTags'>New Historical Tag</Link>

            </div>
        </div>
     )
}

export default Home