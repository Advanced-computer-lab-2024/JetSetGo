import { useState } from 'react';
import SearchBar from './Searchbar';

const HistoricalPlaceFilter = ({onFilter}) => {
    // States for search terms
    const [name, setName] = useState('');
    const [tagId, setTag] = useState('');
    const [category, setCategory] = useState('');


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
                const response = await fetch('/api/tourists/getHistoricalLocations')
                
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
        const results = await fetchResults(name, 'name','/api/tourists/searchHistoricalPlaceByName');

        const results2 = await fetchResults(tagId, 'tags','/api/tourists/searchHistoricalPlaceByTag');

        const results3 = await fetchResults(category, 'category','/api/tourists/searchHistoricalPlaceByCategory');

        if(results.length != 0 && results3.length != 0 && results2.length != 0  )
        {
            const common = results.filter((item) =>
                results2.some((loc) => loc._id === item._id) &&
                results3.some((cat) => cat._id === item._id)
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
        else
        {
            onFilter([])
        }
      
       
        setLoading(false);
    };

    return (
        <div>
            <h1>Search for Activities or Museums</h1>

            {/* Search bars for each search field */}
            <SearchBar label="Name" value={name} onChange={setName} />
            <SearchBar label="Tag" value={tagId} onChange={setTag} />
            <SearchBar label="Category" value={category} onChange={setCategory} />


            {/* Submit button */}
            <button onClick={handleSubmit}>Search</button>

            {/* Loading indicator */}
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default HistoricalPlaceFilter;
