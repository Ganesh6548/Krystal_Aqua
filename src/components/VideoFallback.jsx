import React from "react";

const VideoFallback = () => {
  return (
    <div className="video-fallback" style={{
      position: 'relative',
      width: '100%',
      height: '80vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      textAlign: 'center'
    }}>
      <div>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Pure Water Delivery</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>Video not available. Browse our products below.</p>
        <button style={{
          background: '#25D366',
          color: 'white',
          border: 'none',
          padding: '15px 40px',
          fontSize: '1.1rem',
          borderRadius: '50px',
          cursor: 'pointer'
        }}>
          Order via WhatsApp
        </button>
      </div>
    </div>
  );
};

export default VideoFallback;