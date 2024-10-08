const ActivityDetails = ({Activity}) => {
    return(
        <div className="activity-details">
            <h4>{Activity.title}</h4>
            <p><strong> Date: </strong>{Activity.date}</p>
            <p><strong> Time: </strong>{Activity.time}</p>
            <p><strong> Location: </strong>{Activity.location}</p>
            <p><strong> Price: </strong>{Activity.price}</p>
            <p><strong> Category: </strong>{Activity.category}</p>
            <p><strong> Tags: </strong>{Activity.tags}</p>
            <p><strong> Advertiser: </strong>{Activity.advertiser}</p>
            <p><strong> Booking Open: </strong>{Activity.bookingOpen}</p>
            <p><strong> Rating: </strong>{Activity.rating}</p>
            <p><strong> Special Discounts: </strong>{Activity.specialDiscounts}</p>
            <p><strong>Created At: </strong>{new Date(Activity.createdAt).toLocaleDateString()}</p>
        </div>
    )
}

export default ActivityDetails