import React from 'react';
import "../../pages/Admin/AdminVeiwDocuments"



function UserCard({ username, documents, Id, modelName, onStatusChange }) {
    console.log(Id)
    console.log(modelName)
    const handleAccept = async () => {
      try {
        

        const response = await fetch(`/api/admin/accept/${Id}/${modelName}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          
        });
  
        if (!response.ok) throw new Error('Failed to accept user');
  
        const data = await response.json();
        console.log(data.message); // Handle the response as needed
        onStatusChange(); // Refresh the document list
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleReject = async () => {
      try {
        


        const response = await fetch(`/api/admin/reject/${Id}/${modelName}`, {
          method: 'PATCH', // Assuming DELETE for reject
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) throw new Error('Failed to reject user');
  
        const data = await response.json();
        console.log(data.message); // Handle the response as needed
        onStatusChange(); // Refresh the document list
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
        <h4>{username}</h4>
        {documents.map((doc, index) => (
          <div key={index}>
            <h5>Document {index + 1}</h5>
            <a
              href={`http://localhost:8000/${doc}`} // Ensure this is the correct path
              download={doc} // This attribute triggers the download
              style={{ textDecoration: 'none', color: 'blue' }}
            >
              Download {doc}
            </a>
          </div>
        ))}
        <div style={{ marginTop: '10px' }}>
          <button onClick={handleAccept} style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }}>
            Accept
          </button>
          <button onClick={handleReject} style={{ backgroundColor: 'red', color: 'white' }}>
            Reject
          </button>
        </div>
      </div>
    );
  }
  

export default UserCard;