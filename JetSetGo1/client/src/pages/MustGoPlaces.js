import { useEffect, useState } from 'react'

//components
import ActivtyDetails from "../components/ActivityDetails"

const MustGoPlaces = () => {
    const [upcomingActivities, setUpcomingActivities] = useState(null)

    useEffect(() => {
        const fetchActivities = async () => {
            const response = await fetch('/api/guests/getUpcomingActivities')
            const json= await response.json()

            if (response.ok){
                setUpcomingActivities(json)
            }
        }

        fetchActivities()
    }, [])

    return (
        <div className="mustGoPlaces">
            <div className="upcomingActivities">
                {upcomingActivities && upcomingActivities.map((Activity) => (
                    <ActivtyDetails key={Activity._id} Activity={Activity} />
                ))}
            </div>
        </div>
    )
}

export default MustGoPlaces;