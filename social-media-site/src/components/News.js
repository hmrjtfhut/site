import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'news'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-bold mb-4">News</h2>
      <div>
        {news.map((article) => (
          <div key={article.id} className="mb-4">
            <h3 className="text-lg font-semibold">{article.title}</h3>
            <p>{article.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
