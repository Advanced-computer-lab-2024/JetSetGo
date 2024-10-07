import React from 'react';

const HistoricalLocationDetails = ({ HistoricalLocation }) => {
    return (
        <div className="historicalLocation-details">
            <h4>{HistoricalLocation.name}</h4>
            <p><strong>Description: </strong>{HistoricalLocation.description}</p>
            <p><strong>Location: </strong>{HistoricalLocation.location}</p>
            <p><strong>Opening Hours: </strong>{HistoricalLocation.openingHours}</p>
            <p><strong>Ticket Prices: </strong>
                <ul>
                    <li>Foreigner: {HistoricalLocation.ticketPrices.foreigner} EGP</li>
                    <li>Native: {HistoricalLocation.ticketPrices.native} EGP</li>
                    <li>Student: {HistoricalLocation.ticketPrices.student} EGP</li>
                </ul>
            </p>
            <p><strong>Tags: </strong>{HistoricalLocation.tags}</p>
            <p><strong>Category: </strong>{HistoricalLocation.category}</p> {/* Ensure to fetch category name if it's an ObjectId */}
            <p><strong>Governor: </strong>{HistoricalLocation.governor}</p> {/* Ensure to fetch governor name if it's an ObjectId */}
            <p><strong>Created At: </strong>{new Date(HistoricalLocation.createdAt).toLocaleDateString()}</p>
        </div>
    );
}

export default HistoricalLocationDetails;
