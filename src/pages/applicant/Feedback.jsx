import React, { useState } from 'react';
import './Feedback.css'; // Hii ni muhimu sana kwa CSS mpya!

const Feedback = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "School Promotion Team",
      message: "Tafadhali wasilisha upya CV yako na orodha iliyosasishwa ya machapisho.",
      date: "2025-11-11",
      read: false
    }
  ]);

  const [reply, setReply] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      from: "Wewe", // Mtumiaji anajibu kama 'Wewe'
      message: reply,
      date: new Date().toISOString().split('T')[0], // Tarehe ya leo
      read: true // Ujumbe uliotumwa unachukuliwa kuwa umesomwa na mtumaji
    };

    setMessages([...messages, newMessage]);
    setReply('');
    console.log('Jibu lako limetumwa!');
  };

  return (
    <div className="feedback-container-wrapper"> {/* Container kuu ya ukurasa mzima */}
      <div className="feedback-card"> {/* Kadi kuu inayofunga yaliyomo yote */}
        <h2 className="feedback-title">Maoni & Mawasiliano</h2>

        <div className="messages-area"> {/* Sehemu ya kuonyesha ujumbe */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-item ${
                msg.from === 'Wewe' ? 'message-sender' : 'message-receiver'
              }`}
            >
              <div className="message-header">
                <span className="message-from">
                  {msg.from === 'Wewe' ? 'Wewe' : 'Timu ya Ukuzaji Shule'}
                </span>
                <span className="message-date">{msg.date}</span>
              </div>
              <p className="message-content">{msg.message}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="reply-form">
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Andika jibu lako hapa..."
            className="reply-textarea"
            rows="4" // Ongeza idadi ya mistari ili kutoa nafasi zaidi ya kuandika
          />
          <button type="submit" className="submit-btn"> {/* Button ndani ya form */}
            Tuma Jibu
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;