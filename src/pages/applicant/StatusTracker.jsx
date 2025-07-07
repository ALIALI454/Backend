import React, { useState, useEffect } from 'react';

const StatusTracker = () => {
  const [status, setStatus] = useState('Submitted');
  const [currentHandler, setCurrentHandler] = useState('School Promotion Team');
  const [feedback, setFeedback] = useState('');
  const [statusHistory, setStatusHistory] = useState([
    { status: 'Submitted', handler: 'School Promotion Team', date: '2025-10-01' },
    { status: 'Under Review', handler: 'University Committee', date: '2025-10-05' }
  ]);

  // Status colors
  const statusColors = {
    'Submitted': '#3498db',
    'Under Review': '#f39c12',
    'Approved': '#2ecc71',
    'Rejected': '#e74c3c'
  };

  // Simulate status updates
  useEffect(() => {
    const statuses = ['Submitted', 'Under Review', 'Approved', 'Rejected'];
    const handlers = [
      'School Promotion Team', 
      'University Committee', 
      'Reviewer', 
      'HR Board', 
      'University Council'
    ];
    const feedbackMessages = [
      'Please provide more documentation',
      'Your application looks good',
      'Needs minor revisions',
      '',
      ''
    ];
    
    const interval = setInterval(() => {
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      const randomHandler = handlers[Math.floor(Math.random() * handlers.length)];
      const randomFeedback = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];

      setStatus(randomStatus);
      setCurrentHandler(randomHandler);
      setFeedback(randomFeedback);

      // Add to history if status changed
      if (randomStatus !== status) {
        const newEntry = {
          status: randomStatus,
          handler: randomHandler,
          date: new Date().toISOString().split('T')[0]
        };
        setStatusHistory(prev => [...prev, newEntry]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [status]);

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto',
      padding: '30px',
      backgroundColor: '#f5f9fc',
      borderRadius: '15px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: '25px',
        borderBottom: '2px solid #3498db',
        paddingBottom: '10px'
      }}>Application Status</h2>
      
      <div style={{ 
        marginBottom: '30px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
      }}>
        <p style={{ fontSize: '18px', marginBottom: '15px' }}>
          <strong style={{ color: '#7f8c8d' }}>Current Status:</strong> 
          <span style={{ 
            color: statusColors[status] || '#2c3e50',
            fontWeight: 'bold',
            marginLeft: '10px'
          }}>
            {status}
          </span>
        </p>
        <p style={{ fontSize: '18px' }}>
          <strong style={{ color: '#7f8c8d' }}>Currently with:</strong> 
          <span style={{ 
            color: '#3498db',
            fontWeight: 'bold',
            marginLeft: '10px'
          }}>
            {currentHandler}
          </span>
        </p>
      </div>

      <div style={{ 
        marginBottom: '30px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
      }}>
        <h3 style={{
          color: '#2c3e50',
          borderBottom: '1px solid #ecf0f1',
          paddingBottom: '10px',
          marginBottom: '15px'
        }}>Status History</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {statusHistory.map((item, index) => (
            <li key={index} style={{ 
              padding: '10px 0',
              borderBottom: '1px solid #ecf0f1',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ 
                  color: statusColors[item.status] || '#2c3e50',
                  fontWeight: 'bold'
                }}>
                  {item.status}
                </span>
                <span style={{ color: '#7f8c8d', margin: '0 10px' }}>by</span>
                <span style={{ color: '#3498db' }}>{item.handler}</span>
              </div>
              <span style={{ color: '#95a5a6' }}>{item.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {feedback && (
        <div style={{ 
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#fffde7',
          borderRadius: '10px',
          borderLeft: '5px solid #f39c12',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
        }}>
          <h4 style={{ 
            color: '#f39c12',
            marginTop: '0',
            marginBottom: '10px'
          }}>Feedback from Promotion Team:</h4>
          <p style={{ 
            color: '#34495e',
            fontSize: '16px',
            margin: '0'
          }}>{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default StatusTracker;