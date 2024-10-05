import { useEffect, useState } from "react"

const Home = () => {
const [allMHL, setMHL] = useState(null)
    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch('/api/tourism-governer/showAll')
            const json = await response.json()
            
            if(response.ok){
                setMHL(json)
            }
        }
        fetchData()
    }, [])


    return (
        <div className="home">
            <div className="MHL">
                {allMHL && allMHL.map((MHL) => (
                    <p key={MHL._id}>{MHL.name}</p>
                ))}
            </div>
        </div>
    )
}

export default Home