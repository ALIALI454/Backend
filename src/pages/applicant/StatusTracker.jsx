import React, { useState, useEffect } from 'react';

const StatusTracker = () => {
  const [status, setStatus] = useState('Submitted');
  const [currentHandler, setCurrentHandler] = useState('School Promotion Team');
  const [statusHistory, setStatusHistory] = useState([
    { status: 'Submitted', handler: 'School Promotion Team', date: '2025-10-01' },
    { status: 'Under Review', handler: 'University Committee', date: '2025-10-05' }
  ]);

  // Notifications data
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Application Forwarded", message: "Your application has been forwarded to the University Committee.", date: "2025-07-20", read: false },
    { id: 2, title: "Document Approved", message: "Your documents were approved by the School Promotion Team.", date: "2025-07-18", read: true },
  ]);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const statusColors = {
    'Submitted': '#3498db',
    'Under Review': '#f39c12',
    'Approved': '#2ecc71',
    'Rejected': '#e74c3c'
  };

  useEffect(() => {
    const statuses = ['Submitted', 'Under Review', 'Approved', 'Rejected'];
    const handlers = ['School Promotion Team', 'University Committee', 'Reviewer', 'HR Board', 'University Council'];
    
    const interval = setInterval(() => {
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      const randomHandler = handlers[Math.floor(Math.random() * handlers.length)];

      setStatus(randomStatus);
      setCurrentHandler(randomHandler);

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
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: '25px',
        borderBottom: '2px solid #3498db',
        paddingBottom: '10px'
      }}>Application Status</h2>

      {/* FLEX LAYOUT */}
      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        {/* LEFT SIDE: Status + History */}
        <div style={{
          flex: '1 1 60%',
          minWidth: '300px',
          backgroundColor: '#f5f9fc',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          padding: '20px'
        }}>
          {/* Current Status */}
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
              }}>{status}</span>
            </p>
            <p style={{ fontSize: '18px' }}>
              <strong style={{ color: '#7f8c8d' }}>Currently with:</strong> 
              <span style={{
                color: '#3498db',
                fontWeight: 'bold',
                marginLeft: '10px'
              }}>{currentHandler}</span>
            </p>
          </div>

          {/* Status History */}
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
                    }}>{item.status}</span>
                    <span style={{ color: '#7f8c8d', margin: '0 10px' }}>by</span>
                    <span style={{ color: '#3498db' }}>{item.handler}</span>
                  </div>
                  <span style={{ color: '#95a5a6' }}>{item.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE: Notifications */}
        <div style={{
          flex: '1 1 35%',
          minWidth: '300px',
          background: '#fff',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          padding: '20px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '20px'
          }}>🔔 Notifications</h2>

          {notifications.length === 0 ? (
            <p>No notifications available</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {notifications.map(notification => (
                <li key={notification.id} style={{
                  padding: '20px',
                  borderBottom: '1px solid #eee',
                  backgroundColor: notification.read ? '#fff' : '#f1f8ff',
                  borderLeft: `4px solid ${notification.read ? '#ccc' : '#3498db'}`,
                  marginBottom: '10px',
                  borderRadius: '6px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ margin: 0 }}>{notification.title}</h3>
                    <span style={{ color: '#7f8c8d' }}>{notification.date}</span>
                  </div>
                  <p style={{ margin: '10px 0' }}>{notification.message}</p>
                  {!notification.read && (
                    <button onClick={() => markAsRead(notification.id)} style={{
                      padding: '8px 14px',
                      backgroundColor: '#3498db',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}>
                      Mark as Read
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusTracker;
