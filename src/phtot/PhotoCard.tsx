import React from 'react';

interface PhotoCardProps {
  photo: {
    id: number;
    filename: string;
    data: string;
  };
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  return (
    <div className="photo-card p-2 transform transition-transform hover:scale-105">
      <img src={`data:image/jpeg;base64,${photo.data}`} alt={photo.filename} className="w-full h-48 object-cover rounded-lg" />
      <h3 className="text-center mt-2">{photo.filename}</h3>
    </div>
  );
};

export default PhotoCard;