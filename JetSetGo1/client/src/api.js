// src/api.js
import axios from "axios";

const BASE_URL = "http://localhost:8000/api"; // Adjust as needed

export const search = (keyword) => {
  const cancelTokenSource = axios.CancelToken.source();

  const process = async (callback) => {
    try {
      const response = await axios.get(`${BASE_URL}/search`, {
        params: { keyword },
        cancelToken: cancelTokenSource.token,
      });

      // Check if the response data exists and is an array
      if (response.data && Array.isArray(response.data.data)) {
        callback(
          response.data.data.map((location) => ({
            city: location.name,
            country: location.address.countryName,
            code: location.address.cityCode,
            state: location.address.stateCode,
          }))
        );
      } else {
        // Handle case where 'data' is not available or is in an unexpected format
        console.error("Unexpected response format:", response.data);
        callback([]); // Return an empty array or handle the error accordingly
      }
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error("Error fetching data:", error);
      }
      callback([]); // Return an empty array in case of error
    }
  };

  return { process, cancel: () => cancelTokenSource.cancel() };
};




//   export const getHotels = async (cityCode, checkInDate, checkOutDate, adults) => {
//     try {
//     const response = await axios.get(
//       `${BASE_URL}/hotels?cityCode=${cityCode}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adults=${adults}`
//     );

//     const hotels = response.data; // Directly access response.data since it's already an array

//     // Ensure each item has the properties you need
//     if (Array.isArray(hotels)) {
//       console.log("Hotels received:", hotels.filter((hotel) => hotel && hotel.name && hotel.address));
//       return hotels.filter((hotel) => hotel && hotel.name && hotel.address);
//     } else {
//       console.error("Unexpected response format:", response.data);
//       return [];
//     }
//   } catch (error) {
//     console.error("Error fetching hotels:", error);
//     return [];
//   }
// };


export const getHotels = async (cityCode, checkInDate, checkOutDate, adults) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/hotels?cityCode=${cityCode}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adults=${adults}`
    );

    const hotelOffers = response.data.data; // Access the array of hotel offers

    // Flatten and map each offer into a separate entry
    const hotels = hotelOffers.flatMap((offer) => {
      const hotel = offer.hotel;

      // Map each offer individually, retaining hotel data for each one
      return offer.offers.map((individualOffer) => ({
        hotelId: hotel.hotelId,
        name: hotel.name,
        cityCode: hotel.cityCode,
        latitude: hotel.latitude,
        longitude: hotel.longitude,
        contact: hotel.contact?.phone,
        available: offer.available,
        offerId: individualOffer.id,
        checkInDate: individualOffer.checkInDate,
        checkOutDate: individualOffer.checkOutDate,
        price: individualOffer.price?.total,
        currency: individualOffer.price?.currency,
        room: individualOffer.room?.name,
        boardType: individualOffer.boardType,
        description: individualOffer.description?.text,
      }));
    });

    console.log("Hotels with individual offers:", hotels);
    return hotels;

  } catch (error) {
    console.error("Error fetching hotels:", error);
    return [];
  }
};










