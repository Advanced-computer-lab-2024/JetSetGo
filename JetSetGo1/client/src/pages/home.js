import { Link } from "react-router-dom"
// import { useEffect , useState } from "react"


//components 
// import Tagelement from '../components/tagcomponent.js'
// import Tagform from '../components/tagform.js'

const Home = () => {

    return (
        <div className="home">
            <div className="tags">
                <Link to='/my_tags'>My Tags</Link>
                <br />
                <Link to='/my_category'>My category</Link>
                <br />
                <Link to='/Tourism_Governer'>Tourism_Governer</Link>
                <br />
                <br />
                <br />
                {/* Historical Locations CRUD */}
                <Link to='/HL'>HistoricalLocation</Link>
                <br />
                {/* Museums CRUD */}
                <Link to='/Museum'>Museum</Link>
                <br />
                {/* Tourism Governor Create new historical tag */}
                <Link to='/HLTags'>New Historical Tag</Link>
                <br />
                {/* Tourism Governor view their museums and historical locations */}
                <Link to='/HLMs'>My Museums and Historical Locations</Link>
                <br />
                {/* Tour Guide view their Itineraries */}
                <Link to='/Itineraries'>My Itineraries</Link>
                <br />
                {/* Advertiser view their Activities */}
                <Link to='/Activities'>My Activities</Link>
            </div>
        </div>
    )
}

export default Home