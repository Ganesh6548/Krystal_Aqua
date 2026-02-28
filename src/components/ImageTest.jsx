import React, { useState } from 'react';

const ImageTest = () => {
  const [imageStatus, setImageStatus] = useState('Checking...');

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'black',
      color: 'white',
      padding: '10px',
      zIndex: 9999
    }}>
      <h4>Image Test</h4>
      <div>
        <img 
          src={`${import.meta.env.BASE_URL}Logo-two (2).png`} 
          alt="Test" 
          style={{width: '100px'}}
          onLoad={() => setImageStatus('✅ Image loaded')}
          onError={() => setImageStatus('❌ Image NOT found')}
        />
        <p>Status: {imageStatus}</p>
        <p>Path: {import.meta.env.BASE_URL + 'Logo-two (2).png'}</p>
      </div>
    </div>
  );
};

export default ImageTest;
