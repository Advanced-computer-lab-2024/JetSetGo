import { useState } from 'react';
import SearchBar from './Searchbar';

const ActivityFilter = ({ onFilter }) => {
    const [name, setName] = useState('');
    const [tagId, setTag] = useState('');
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState('');
    const [date, setDate] = useState('');
    const [budget, setBudget] = useState(0);

    const [loading, setLoading] = useState(false);

    const fetchResults = async (query, field, route) => {
        setLoading(true);
        try {
            if (query !== '') {
                console.log("TRY SEARCH" , field)
                const response = await fetch(route, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ [field] : query }),
                });

                if (response.ok) {
                    const json = await response.json();
                    return json;
                } else {
                    return [];
                }
            } else {
                const response = await fetch('/api/tourist/getUpcomingActivities');
                const json = await response.json();
                return json;
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const results = await fetchResults(name, 'title', '/api/tourist/searchActivityByName');
            const results2 = await fetchResults(tagId, 'tagId', '/api/tourist/searchActivityByTag');
            const results3 = await fetchResults(category, 'category', '/api/tourist/searchActivityByCategory');
            console.log(rating)
            
            const results4 = rating !== '' ? await fetchResults(Number(rating) , 'rating', '/api/tourist/searchActivityByRating') : results; // Filter for rating only if it’s set
            const results5 = await fetchResults(date, 'date', '/api/tourist/searchActivityByDate');
            const results6 = await fetchResults(budget, 'price', '/api/tourist/searchActivityByBudget');

            // Filter common results across all criteria
            const common = results.filter((item) =>
                (!tagId || results2.some((loc) => loc._id === item._id)) &&
                (!category || results3.some((cat) => cat._id === item._id)) &&
                (!rating || results4.some((rat) => rat._id === item._id)) &&
                (!date || results5.some((dat) => dat._id === item._id)) &&
                (!budget || results6.some((bud) => bud._id === item._id))
            );

            onFilter(common.length ? common : []);
        } catch (error) {
            alert(`An error occurred: ${error.message}`);
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Search for Activities</h1>

            <SearchBar label="Name" value={name} onChange={setName} />
            <SearchBar label="Tag" value={tagId} onChange={setTag} />
            <SearchBar label="Category" value={category} onChange={setCategory} />

            <div>
                <label>Rating</label>
                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value="">Select Rating</option>
                    {[0, 1, 2, 3, 4, 5].map((star) => (
                        <option key={star} value={star}>
                            {star} Star{star !== 1 ? 's' : ''}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>

            <div>
                <label>Budget: {budget} USD</label>
                <input
                    type="range"
                    min="0"
                    max="10000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                />
            </div>

            <button onClick={handleSubmit}>Search</button>

            {loading && <p>Loading...</p>}
        </div>
    );
};

export default ActivityFilter;
