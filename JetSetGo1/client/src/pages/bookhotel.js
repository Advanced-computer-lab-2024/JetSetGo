// import ItineraryManager from "./ItineraryManager";
import AccommodationSearch from "../components/AccommodationSearch"
import AccommodationApp from "../components/AccommodationApp" 
import { useLocation } from 'react-router-dom';

const Booking = ({ touristId }) => {
    const location = useLocation(); // Access state passed via Link
    const { id } = location.state || {};
    touristId = id;
    console.log("touristId in page"+touristId); 
    return (
        <div className="home">
            <h2>Booking.com</h2>
            <AccommodationApp touristId={touristId} />
        </div>
    );
}

export default Booking;
