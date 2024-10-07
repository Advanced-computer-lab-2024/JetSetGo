import { useState } from 'react';
import SearchBar from './Searchbar';

const GuestActivityFilter = () => {
    // States for search terms
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState('');
    const [date, setDate] = useState('');
    const [budget, setBudget] = useState('');

    // State for results
    const [commonResults, setCommonResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to fetch results from the backend
    const fetchResults = async ( query , field , rout ) => {
        setLoading(true);
        try {
            if(query.length != 0)
            {
                const response = await fetch(rout, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ [field]: query }), // Send the search fields
                });
                
            const json = await response.json();
            return json; // Return the search results
            }
            else
            {
                //THIS WILL CHANGE DEPENDING ON THE OBJECT (ACTIVITY, MUSUEM ..)
                const response = await fetch('/api/guests/getUpcomingActivities')
                
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

    // Handle submit when the user clicks the submit button
    const handleSubmit = async () => {
        setLoading(true);
        //ROUTES CHANGE DEPENDING ON THE FUCNTION NEEDED
        // 'TITLE' CHANGES DEPENDING ON THE ATTIRBUTE IN THE SCHEMAAA
        //NAME DEPENDS ON THE STATE 

        const results3 = await fetchResults(category, 'category','/api/tourists/searchActivityByCategory');

        const results4 = await fetchResults(rating, 'rating','/api/tourists/searchActivityByRating');

        const results5 = await fetchResults(date, 'date','/api/tourists/searchActivityByDate');

        const results6 = await fetchResults(budget, 'price','/api/tourists/searchActivityByBudget');

        const common = results3.filter((item) =>
            results4.some((rat) => rat._id === item._id) &&
            results5.some((dat) => dat._id === item._id) &&
            results6.some((bud) => bud._id === item._id)
        );
        setCommonResults(common);

        setLoading(false);
    };

    return (
        <div>
            <h1>Search for Activities or Museums</h1>

            {/* Search bars for each search field */}
            <SearchBar label="Category" value={category} onChange={setCategory} />
            <SearchBar label="Rating" value={rating} onChange={setRating} />
            <SearchBar label="Date" value={date} onChange={setDate} />
            <SearchBar label="Budget" value={budget} onChange={setBudget} />

            {/* Submit button */}
            <button onClick={handleSubmit}>Search</button>

            {/* Loading indicator */}
            {loading && <p>Loading...</p>}

            {/* Display the common results */}
            {!loading && commonResults.length > 0 && (
                <div>
                    <h2>Results:</h2>
                    {commonResults.map((result) => (
                        <div key={result._id}>
                            <h3>{result.title}</h3>
                            <p>TAG : {result.tags}</p>
                            <p>Location: {result.location}</p>
                            <p>Category: {result.category}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Display message if no results found */}
            {!loading && commonResults.length === 0 && (
                <p>No results found</p>
            )}
        </div>
    );
};

export default GuestActivityFilter;
