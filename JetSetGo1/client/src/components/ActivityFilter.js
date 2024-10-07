import { useState } from 'react';
import SearchBar from './Searchbar';
//import ActivityDetails  from './components/ActivityDetails';

const ActivityFilter = ({onFilter}) => {
    // States for search terms
    const [name, setName] = useState('');
    const [tagId, setTag] = useState('');
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
                const response = await fetch('/api/tourists/getUpcomingActivities')
                
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
        try{

        setLoading(true);
        //ROUTES CHANGE DEPENDING ON THE FUCNTION NEEDED
        // 'TITLE' CHANGES DEPENDING ON THE ATTIRBUTE IN THE SCHEMAAA
        //NAME DEPENDS ON THE STATE 
        const results = await fetchResults(name, 'title','/api/tourists/searchActivityByName');

        const results2 = await fetchResults(tagId, 'tagId','/api/tourists/searchActivityByTag');

        const results3 = await fetchResults(category, 'category','/api/tourists/searchActivityByCategory');

        const results4 = await fetchResults(rating, 'rating','/api/tourists/searchActivityByRating');

        const results5 = await fetchResults(date, 'date','/api/tourists/searchActivityByDate');

        const results6 = await fetchResults(budget, 'price','/api/tourists/searchActivityByBudget');

        const common = results.filter((item) =>
            results2.some((loc) => loc._id === item._id) &&
            results3.some((cat) => cat._id === item._id) &&
            results4.some((rat) => rat._id === item._id) &&
            results5.some((dat) => dat._id === item._id) &&
            results6.some((bud) => bud._id === item._id)
        );
        setCommonResults(common);
        if(common.length != 0)
        {
            onFilter(common)
        }
        else
        {
            onFilter([])
        }
    }
    catch(error)
    {
        alert(`An error occurred: ${error.message}`);
        console.error('Error fetching search results:', error);
    }
    finally
    {
        setLoading(false);
    }
    };

    return (
        <div>
            <h1>Search for Activities</h1>

            {/* Search bars for each search field */}
            <SearchBar label="Name" value={name} onChange={setName} />
            <SearchBar label="Tag" value={tagId} onChange={setTag} />
            <SearchBar label="Category" value={category} onChange={setCategory} />
            <SearchBar label="Rating" value={rating} onChange={setRating} />
            <SearchBar label="Date" value={date} onChange={setDate} />
            <SearchBar label="Budget" value={budget} onChange={setBudget} />

            {/* Submit button */}
            <button onClick={handleSubmit}>Search</button>

            {/* Loading indicator */}
            {loading && <p>Loading...</p>}

           
        </div>
    );
};

export default ActivityFilter;
