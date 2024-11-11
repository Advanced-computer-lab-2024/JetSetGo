import React, { useState } from 'react';

function ShareLink() {
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipboard = async () => {
    const currentUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopySuccess('Link copied!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <input
        type="text"
        value={window.location.href}
        readOnly
        style={{
          width: '100%',
          padding: '10px',
          margin: '10px 0',
          fontSize: '16px',
          textAlign: 'center'
        }}
      />
      <button onClick={copyToClipboard} style={{
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
      }}>
        Share
      </button>
      {copySuccess && <p style={{ color: 'green' }}>{copySuccess}</p>}
    </div>
  );
}

export default ShareLink;
