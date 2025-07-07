import React, { useState } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Application Received",
      message: "Your promotion application has been received by the School Promotion Team.",
      date: "2023-11-10",
      read: false
    },
    {
      id: 2,
      title: "Document Verification",
      message: "All your submitted documents have been verified.",
      date: "2023-11-12",
      read: false
    },
    {
      id: 3,
      title: "Application Forwarded",
      message: "Your application has been forwarded to the University Committee.",
      date: "2023-11-19",
      read: false
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '40px auto',
      padding: '30px',
      background: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
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
            <li
              key={notification.id}
              style={{
                padding: '20px',
                borderBottom: '1px solid #eee',
                backgroundColor: notification.read ? '#fff' : '#f1f8ff',
                borderLeft: `4px solid ${notification.read ? '#ccc' : '#3498db'}`,
                marginBottom: '10px',
                borderRadius: '6px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ margin: 0 }}>{notification.title}</h3>
                <span style={{ color: '#7f8c8d' }}>{notification.date}</span>
              </div>
              <p style={{ margin: '10px 0' }}>{notification.message}</p>
              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  style={{
                    padding: '8px 14px',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Mark as Read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
