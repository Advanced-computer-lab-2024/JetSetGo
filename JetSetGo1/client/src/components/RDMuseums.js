const MuseumElement = ({ museum, dispatch }) => {

    const handleClick = async () => {

        const response = await fetch('http://localhost:8000/api/tourism-governer/deleteMuseum/' + museum._id, {
            method: 'DELETE'
        });
        const json = await response.json();
        if (!response.ok) {
        }
        if (response.ok) {
            console.log('museum deleted:', json)
        }
    };

    return (
        <div className="museum-details">
            <h4>{museum.title}</h4>
            <p><strong>Name: </strong>{museum.name}</p>
            <p><strong>Description: </strong>{museum.description}</p>
            <p><strong>Location: </strong>{museum.location}</p>
            <p><strong>Opening Hours : </strong>{museum.openingHours}</p>
            <p><strong>Ticket Prices for Foreigners: </strong>{museum.ticketPricesF}</p>
            <p><strong>Ticket Prices for Natives: </strong>{museum.ticketPricesN}</p>
            <p><strong>Ticket Prices for Students: </strong>{museum.ticketPricesS}</p>
            <p><strong>Pictures: </strong>{museum.pictures}</p>
            <p><strong>Tags: </strong>{museum.tags}</p>
            <p><strong>Category: </strong>{museum.category}</p>
            <p><strong>Governor: </strong>{museum.governor}</p>

            <p>{museum.createdAt}</p>
            <span onClick={handleClick}>X</span>
        </div>
    );
};

export default MuseumElement;