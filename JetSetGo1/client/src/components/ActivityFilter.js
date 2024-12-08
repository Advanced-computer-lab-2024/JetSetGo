import { useState, useEffect } from 'react';
import SearchBar from './Searchbar';

const ActivityFilter = ({ onFilter }) => {
    const [name, setName] = useState('');
    const [selectedTags, setSelectedTags] = useState([]); // Track selected tag IDs
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [rating, setRating] = useState('');
    const [date, setDate] = useState('');
    const [budget, setBudget] = useState(0);
    const [categoryList, setCategoryList] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isCategoryListVisible, setCategoryListVisible] = useState(false);
    const [isTagListVisible, setTagListVisible] = useState(false);

    // Fetch all categories
    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/admin/category');
            const json = await response.json();
            setCategoryList(json);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const toggleCategoryList = () => {
        setCategoryListVisible(!isCategoryListVisible);
    };

    // Toggle the visibility of the tag list
    const toggleTagList = () => {
        setTagListVisible(!isTagListVisible);
    };

    // Fetch all tags
    const fetchTags = async () => {
        try {
            const response = await fetch('/api/tourist/getTags');
            const json = await response.json();
            setTagList(json);
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    };

    // Fetch search results logic remains unchanged
    const fetchResults = async (query, field, route) => {
        setLoading(true);
        try {
            if (query !== '') {
                const response = await fetch(route, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ [field]: query }),
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

            // Fetch results for each selected tag by tag ID
            let results2 = results; // Start with default results
            if (selectedTags.length > 0) {
                for (let tagId of selectedTags) {
                    const tagResults = await fetchResults(tagId, 'tagId', '/api/tourist/searchActivityByTag');
                    results2 = results2.filter((item) => tagResults.some((tag) => tag._id === item._id));
                }
            }

            let results3 = results;
            if (selectedCategories.length > 0) {
                for (let categoryId of selectedCategories) {
                    const categoryResults = await fetchResults(categoryId, 'category', '/api/tourist/searchActivityByCategory');
                    results3 = results3.filter((item) => categoryResults.some((cat) => cat._id === item._id));
                }
            }

            const results4 = rating !== '' ? await fetchResults(Number(rating), 'rating', '/api/tourist/searchActivityByRating') : results;
            const results5 = await fetchResults(date, 'date', '/api/tourist/searchActivityByDate');
            const results6 = budget > 0 ? await fetchResults(budget, 'price', '/api/tourist/searchActivityByBudget') : results;

            const common = results.filter((item) =>
                (selectedTags.length === 0 || results2.some((tag) => tag._id === item._id)) &&
                (selectedCategories.length === 0 || results3.some((cat) => cat._id === item._id)) &&
                (!rating || results4.some((rat) => rat._id === item._id)) &&
                (!date || results5.some((dat) => dat._id === item._id)) &&
                (budget === 0 || results6.some((bud) => bud._id === item._id))
            );

            onFilter(common.length ? common : []);
        } catch (error) {
            alert(`An error occurred: ${error.message}`);
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedCategories((prev) => [...prev, value]);
        } else {
            setSelectedCategories((prev) => prev.filter((category) => category !== value));
        }
    };

    const handleTagChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedTags((prev) => [...prev, value]);
        } else {
            setSelectedTags((prev) => prev.filter((tag) => tag !== value));
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchTags();
    }, []);

    return (
        <div style={{ height: '500px', overflowY: 'scroll', border: '1px solid #ccc', padding: '1rem' }}>
            <h1>Search for Activities</h1>

            <SearchBar label="Name" value={name} onChange={setName} />

            <div>
            <h6 onClick={toggleCategoryList} style={{ cursor: 'pointer' }}>
                    Categories
                    <span style={{ marginLeft: '8px', fontSize: '0.9em' }}>
                        {isCategoryListVisible ? '▲' : '▼'}
                    </span>
                </h6>
                {isCategoryListVisible && categoryList.length > 0 && (categoryList.length > 0 ? (
                    categoryList.map((category) => (
                        <div key={category._id}>
                           <input
                                    type="checkbox"
                                    value={category._id}
                                    onChange={handleCategoryChange}
                                    checked={selectedCategories.includes(category._id)}
                                /> <label>
                                
                                {category.name}
                            </label>
                        </div>
                    ))
                ) : (
                    <p>Loading categories...</p>
                )
                  
                )}
            </div>

            <div>
                <h6 onClick={toggleTagList} style={{ cursor: 'pointer' }}>
                    Tags
                    <span style={{ marginLeft: '8px', fontSize: '0.9em' }}>
                        {isTagListVisible ? '▲' : '▼'}
                    </span>
                </h6>
                {isTagListVisible && tagList.length > 0 && (tagList.length > 0 ? (
                    tagList.map((tag) => (
                        <div key={tag._id}>
                           <input
                                    type="checkbox"
                                    value={tag._id}
                                    onChange={handleTagChange}
                                    checked={selectedTags.includes(tag._id)}
                                /> <label>
                                
                                {tag.tag_name}
                            </label>
                        </div>
                    ))
                ) : (
                    <p>Loading categories...</p>
                )
                  
                )}
            </div>

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
                    max="1000"
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
