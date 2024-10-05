import { useState } from "react";

const NewHLTag = () => {
    const [type, setType] = useState('');
    const [historicalPeriod, setHistoricalPeriod] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hlTag = { type, historicalPeriod };

        const response = await fetch('/api/tourism-governer/newTag', {
            method: 'POST',
            body: JSON.stringify(hlTag),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            setType('');
            setHistoricalPeriod('');
            setError(null);
            console.log('New historical location tag added', json);
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Historical Location Tag</h3>

            <label>Type:</label>
            <select onChange={(e) => setType(e.target.value)} value={type}>
                <option value="">Select Type</option>
                <option value="Monuments">Monuments</option>
                <option value="Museums">Museums</option>
                <option value="Religious Sites">Religious Sites</option>
                <option value="Palaces/Castles">Palaces/Castles</option>
            </select>

            <label>Historical Period:</label>
            <input
                type="text"
                onChange={(e) => setHistoricalPeriod(e.target.value)}
                value={historicalPeriod}
            />

            <button>Add Historical Location Tag</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default NewHLTag
