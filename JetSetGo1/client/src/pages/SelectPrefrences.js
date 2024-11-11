import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PreferencesSelection = () => {
  const [ID, setId] = useState('');
  const [tags, setTags] = useState([]); // Store tags fetched from the database
  const [selectedTags, setSelectedTags] = useState([]);
  const [budget, setBudget] = useState({ from: '', to: '' });

  // Fetch tags from the backend
  const fetchTags = async () => {
    try {
      const response = await axios.get('/api/admin/tag'); // Fetch tags
      setTags(response.data); // Set fetched tags
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  // Fetch tags when the component mounts
  useEffect(() => {
    fetchTags();
  }, []);

  // Toggle tag selection
  const handleTagClick = (tagId) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tagId) ? prevTags.filter((id) => id !== tagId) : [...prevTags, tagId]
    );
    console.log(selectedTags);
  };

  // Handle budget input changes
  const handleBudgetChange = (e) => {
    const { name, value } = e.target;
    setBudget((prevBudget) => ({ ...prevBudget, [name]: value }));
  };

  // Submit selected preferences
  const submitPreferences = async () => {
    console.log("ID:", ID); // Log the ID to verify it is correct
    const preferences = {
      tags: selectedTags,
      budget: {
        from: Number(budget.from),
        to: Number(budget.to),
      },
    };
    console.log(preferences);

    try {
      const response = await axios.patch(`/api/tourist/selectPrefrences/${ID}`, preferences);
      console.log('Preferences updated:', response.data);
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  return (
    <div>
      <h2>Select Your Preferences</h2>

      <label>ID:</label>
      <input
        type="text"
        onChange={(e) => setId(e.target.value)}
        value={ID}
      />

      <div>
        <h3>Tags</h3>
        {tags.map((tag) => (
          <button
            key={tag._id}
            onClick={() => handleTagClick(tag._id)}
            style={{
              backgroundColor: selectedTags.includes(tag._id) ? 'blue' : 'gray',
              color: 'white',
              margin: '5px',
              padding: '10px',
            }}
          >
            {tag.tag_name}
          </button>
        ))}
      </div>

      <div>
        <h3>Budget</h3>
        <label>
          Lower Limit:
          <input
            type="number"
            name="from"
            value={budget.from}
            onChange={handleBudgetChange}
          />
        </label>
        <label>
          Upper Limit:
          <input
            type="number"
            name="to"
            value={budget.to}
            onChange={handleBudgetChange}
          />
        </label>
      </div>

      <button onClick={submitPreferences}>Save Preferences</button>
    </div>
  );
};

export default PreferencesSelection;
