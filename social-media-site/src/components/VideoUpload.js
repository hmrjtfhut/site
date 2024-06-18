import React, { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

function VideoUpload() {
  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState('');

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!video) return;
    const storageRef = ref(storage, `videos/${video.name}`);
    const uploadTask = uploadBytesResumable(storageRef, video);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      }, 
      (error) => {
        console.error(error);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload Video</h2>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload} className="bg-blue-600 text-white p-2 rounded mt-2">Upload</button>
      <div className="mt-2">
        <progress value={progress} max="100" />
        {url && <a href={url} target="_blank" rel="noopener noreferrer">View Uploaded Video</a>}
      </div>
    </div>
  );
}

export default VideoUpload;
