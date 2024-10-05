import { useState } from "react"

const newHL = () =>{
    const[name, setName] = useState('')
    const[description, setDescription] = useState('')
    const[location, setLocation] = useState('')
    const[openingHours, setOpeningHours] = useState('')
    const[ticketPricesF, setTicketPricesF] = useState('')
    const[ticketPricesN, setTicketPricesN] = useState('')
    const[ticketPricesS, setTicketPricesS] = useState('')
    const[pictures, setPictures] = useState('')
    const[tags, setTags] = useState('')
    const[category, setCategory] = useState('')
    const[governor, setGovernor] = useState('')
    const[error, setError] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()

        const museum = {name, description, location, openingHours, ticketPricesF, ticketPricesN, ticketPricesS, pictures, tags, category, governor}

        const response = await fetch('/api/tourism-governer/newHL', {
            method: 'POST',
            body: JSON.stringify(museum),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setName('')
            setDescription('')
            setLocation('')
            setOpeningHours('')
            setTicketPricesF('')
            setTicketPricesN('')
            setTicketPricesS('')
            setPictures('')
            setTags('')
            setCategory('')
            setGovernor('')
            setError(null)
            console.log('new historical location added', json)

        }
    }

    return(
        <form classNme="create" onSubmit={handleSubmit}>
            <h3>Add a new historical location</h3>

            <label>Name:</label>
            <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            />
            

            <label>Description:</label>
            <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            />

            <label>Location:</label>
            <input
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            />

            <label>Opening Hours:</label>
            <input
            type="text"
            onChange={(e) => setOpeningHours(e.target.value)}
            value={openingHours}
            />

            <label>Ticket Prices:</label>
            <label>Foreigners:</label>
            <input
            type="number"
            onChange={(e) => setTicketPricesF(e.target.value)}
            value={ticketPricesF}
            />
            <label>Natives:</label>
            <input
            type="number"
            onChange={(e) => setTicketPricesN(e.target.value)}
            value={ticketPricesN}
            />
           <label>Students:</label>
            <input
            type="number"
            onChange={(e) => setTicketPricesS(e.target.value)}
            value={ticketPricesS}
            />


            <label>Pictures:</label>
            <input
            type="text"
            onChange={(e) => setPictures(e.target.value)}
            value={pictures}
            />

            <label>Tags:</label>
            <input
            type="text"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
            />

            <label>Category:</label>
            <input
            type="text"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            />

            <label>Governor:</label>
            <input
            type="text"
            onChange={(e) => setGovernor(e.target.value)}
            value={governor}
            />


            <button>Add Historical Location</button>
            {error &&<div className="error">{error}</div>}



        </form>
         
    )
}

export default newHL