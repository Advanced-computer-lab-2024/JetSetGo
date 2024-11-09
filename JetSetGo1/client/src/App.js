import React, { useState } from 'react';
import AdminDocumentReview from './components/  ';
import './App.css';

function App() {
  const [view, setView] = useState('home'); // 'home', 'viewDocuments'

  const handleViewDocuments = () => {
    setView('viewDocuments');
  };

  const handleBackToHome = () => {
    setView('home');
  };

  return (
    <div className="App">
      <h1>Admin Panel</h1>

      {view === 'home' ? (
        <div>
          <button onClick={handleViewDocuments} className="admin-button">
            View Documents
          </button>
          {/* Additional buttons for other actions can be added here */}
        </div>
      ) : (
        <div>
          <button onClick={handleBackToHome} className="admin-button back-button">
            Back to Home
          </button>
          <AdminDocumentReview />
        </div>
      )}
    </div>
  );
}

export default App;
