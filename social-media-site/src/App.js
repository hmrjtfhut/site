import React from 'react';
import Chat from './components/Chat';
import News from './components/News';
import VideoUpload from './components/VideoUpload';

function App() {
  return (
    <div className="bg-blue-100 min-h-screen">
      <header className="bg-blue-600 p-4 text-white text-center">
        <h1 className="text-2xl font-bold">Social Media Site</h1>
      </header>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-2">
            <News />
            <VideoUpload />
          </div>
          <div className="col-span-1">
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
