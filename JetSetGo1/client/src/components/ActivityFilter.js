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
                
                if(response.ok)
                    {
                    const json = await response.json();
                    return json;
                    }
                    else
                    {
                      return [];  
                    }
            }
            else
            {
                //THIS WILL CHANGE DEPENDING ON THE OBJECT (ACTIVITY, MUSUEM ..)
                const response = await fetch('/api/tourist/getUpcomingActivities')
                
            const json = await response.json();
            return json; // Return the search results
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
            const results4 = await fetchResults(rating, 'rating', '/api/tourist/searchActivityByRating');
            const results5 = await fetchResults(date, 'date', '/api/tourist/searchActivityByDate');
            const results6 = await fetchResults(budget, 'price', '/api/tourist/searchActivityByBudget');

            
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
                console.log("empty")
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
