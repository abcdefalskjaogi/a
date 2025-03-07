import React, { useState, useEffect } from 'react';
import PhotoCard from './PhotoCard';
import UploadPhotoModal from './UploadPhotoModal';

interface Photo {
  id: number;
  filename: string;
  data: string;
}

const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/photos')
      .then(response => response.json())
      .then(data => setPhotos(data))
      .catch(error => console.error('Error fetching photos:', error));
  }, []);

  const handleUpload = (photo: { filename: string; data: string }) => {
    fetch('http://localhost:5000/api/photos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(photo),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(newPhoto => setPhotos(prevPhotos => [...prevPhotos, newPhoto]))
      .catch(error => console.error('Error uploading photo:', error));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <input type="text" placeholder="搜索照片" className="border border-gray-300 rounded-lg p-2 w-1/2" />
        <button onClick={() => setIsModalOpen(true)} className="ml-4 bg-blue-500 text-white p-2 rounded-lg">添加照片</button>
      </div>
      <UploadPhotoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onUpload={handleUpload} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {photos.map(photo => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;