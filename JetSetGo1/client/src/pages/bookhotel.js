// import ItineraryManager from "./ItineraryManager";
import AccommodationSearch from "../components/AccommodationSearch"
import AccommodationApp from "../components/AccommodationApp" 

const Booking = ({ touristId }) => {
    return (
        <div className="home">
            <h2>Booking.com</h2>
            <AccommodationApp touristId={touristId} />
        </div>
    );
}

export default Booking;
