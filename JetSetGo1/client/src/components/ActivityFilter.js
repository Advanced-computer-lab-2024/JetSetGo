import { useState } from 'react';
import SearchBar from './Searchbar';

const ActivityFilter = ({onFilter}) => {
    const [name, setName] = useState('');
    const [tagId, setTag] = useState('');
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState('');
    const [date, setDate] = useState('');
    const [budget, setBudget] = useState('');

    const [loading, setLoading] = useState(false);

    const fetchResults = async ( query , field , rout ) => {
        setLoading(true);
        try {
            if (query.length !== 0) {
                const response = await fetch(rout, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ [field]: query }), 
                });
                
                const json = await response.json();
                return json; 
            } else {
                const response = await fetch('/api/tourists/getUpcomingActivities');
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
            
            const results = await fetchResults(name, 'title', '/api/tourists/searchActivityByName');
            const results2 = await fetchResults(tagId, 'tagId', '/api/tourists/searchActivityByTag');
            const results3 = await fetchResults(category, 'category', '/api/tourists/searchActivityByCategory');
            const results4 = await fetchResults(rating, 'rating', '/api/tourists/searchActivityByRating');
            const results5 = await fetchResults(date, 'date', '/api/tourists/searchActivityByDate');
            const results6 = await fetchResults(budget, 'price', '/api/tourists/searchActivityByBudget');

            const common = results.filter((item) =>
                results2.some((loc) => loc._id === item._id) &&
                results3.some((cat) => cat._id === item._id) &&
                results4.some((rat) => rat._id === item._id) &&
                results5.some((dat) => dat._id === item._id) &&
                results6.some((bud) => bud._id === item._id)
            );

            if (common.length !== 0) {
                onFilter(common);
            } else {
                onFilter([]);
            }
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
            <SearchBar label="Rating" value={rating} onChange={setRating} />
            <SearchBar label="Date" value={date} onChange={setDate} />
            <SearchBar label="Budget" value={budget} onChange={setBudget} />

            <button onClick={handleSubmit}>Search</button>

            {loading && <p>Loading...</p>}
        </div>
    );
};

export default ActivityFilter;
