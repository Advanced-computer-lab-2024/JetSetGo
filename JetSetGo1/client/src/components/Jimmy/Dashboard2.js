import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard2.css";

function Dashboard2() {
  const [completedTourGuides, setCompletedTourGuides] = useState([]);
  const [followedItineraries, setFollowedItineraries] = useState([]);
  const [allItineraries, setAllItineraries] = useState([]);
  const [allTourGuides, setAllTourGuides] = useState([]);
  const touristId = "670670e70c449b57490188b7"; // replace with actual touristId

  useEffect(() => {
    // Fetch completed tour guides
    fetch(`http://localhost:8000/api/tourist/completed/${touristId}`)
      .then((res) => res.json())
      .then((data) => setCompletedTourGuides(data))
      .catch((error) =>
        console.error("Error fetching completed tour guides:", error)
      );

    // Fetch followed itineraries
    fetch(`http://localhost:8000/api/tourist/followed/${touristId}`)
      .then((res) => res.json())
      .then((data) => setFollowedItineraries(data))
      .catch((error) =>
        console.error("Error fetching followed itineraries:", error)
      );

    // Fetch all itineraries
    fetch("http://localhost:8000/api/tour-guides/getItineraries")
      .then((res) => res.json())
      .then((data) => setAllItineraries(data))
      .catch((error) =>
        console.error("Error fetching all itineraries:", error)
      );
  }, [touristId]);

  useEffect(() => {
    // Fetch all tour guides and filter for accepted guides only
    fetch("http://localhost:8000/api/tourist/getAllTourGuideProfiles")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.tourGuides) {
          // Filter for only accepted tour guides
          const acceptedTourGuides = data.tourGuides.filter(
            (guide) => guide.accepted === true
          );
          setAllTourGuides(acceptedTourGuides);
        } else {
          console.error("No tour guides found in the response.");
        }
      })
      .catch((error) =>
        console.error("Error fetching all tour guides:", error)
      );
  }, [touristId]);

  // Remove duplicates by filtering out tour guides that are already in completedTourGuides
  const uniqueTourGuides = allTourGuides.filter(
    (guide) =>
      !completedTourGuides.some(
        (completedGuide) => completedGuide._id === guide._id
      )
  );

  // Combine unique guides with the completed guides (to show completed as a flag)
  const combinedTourGuides = [...completedTourGuides, ...uniqueTourGuides];

  // Ensure uniqueness based on _id
  const uniqueCombinedTourGuides = Array.from(
    new Map(combinedTourGuides.map((guide) => [guide._id, guide])).values()
  );

  return (
    <div>
      <h1>All Tour Guides</h1>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Completed Tour Guide</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(uniqueCombinedTourGuides) ? (
            uniqueCombinedTourGuides.map((guide) => (
              <tr key={guide._id}>
                <td>{guide.username}</td>
                <td>{guide.email}</td>
                {/* Check if the guide is in completedTourGuides */}
                <td>
                  {completedTourGuides.some(
                    (completedGuide) => completedGuide._id === guide._id
                  )
                    ? "Yes"
                    : "No"}
                </td>
                <td>
                  <Link to={`/tourist/viewTourGuideProfile/${guide._id}`}>
                    View Profile
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No tour guides available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard2;