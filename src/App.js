import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Parse the input to JSON
      const jsonInput = JSON.parse(input);
      
      // Make a POST request to the backend API
      const res = await fetch('tusharvit-fff0316dff65.herokuapp.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonInput),
      });

      // Get the response data from the backend
      const data = await res.json();
      setResponse(data);
      setError('');
    } catch (err) {
      setError('Invalid JSON or failed to fetch data.');
    }
  };

  const handleFilterChange = (e) => {
    const { options } = e.target;
    const selected = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setFilter(selected);
  };

  const filteredResponse = () => {
    if (!response) return null;
    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    let result = {};
    if (filter.includes('Numbers')) result.numbers = numbers;
    if (filter.includes('Alphabets')) result.alphabets = alphabets;
    if (filter.includes('Highest lowercase alphabet')) result.highest_lowercase_alphabet = highest_lowercase_alphabet;
    return result;
  };

  return (
    <div className="App">
      <h1>Frontend Application</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON here, e.g., {"data": ["A", "B", "C"]}'
        />
        <button type="submit">Submit</button>
      </form>

      {/* Multi-Select Dropdown */}
      <select multiple onChange={handleFilterChange}>
        <option value="Alphabets">Alphabets</option>
        <option value="Numbers">Numbers</option>
        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
      </select>

      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      
      {filteredResponse() && (
        <div>
          <h2>Filtered Response:</h2>
          <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
