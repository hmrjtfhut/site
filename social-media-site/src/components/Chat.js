import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        timestamp: new Date(),
      });
      setNewMessage('');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Live Chat</h2>
      <div className="mb-4 h-64 overflow-y-scroll">
        {messages.map((message) => (
          <div key={message.id} className="p-2 border-b border-gray-200">
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow p-2 border rounded-l"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded-r">Send</button>
      </form>
    </div>
  );
}

export default Chat;
