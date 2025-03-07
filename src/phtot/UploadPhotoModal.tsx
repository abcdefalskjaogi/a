import React, { useState } from 'react';

interface UploadPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (photo: { filename: string; data: string }) => void;
}

const UploadPhotoModal: React.FC<UploadPhotoModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [filename, setFilename] = useState('');
  const [fileData, setFileData] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileData(reader.result as string);
        setFilename(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (filename && fileData) {
      const base64Data = fileData.split(',')[1]; // Remove the data URL prefix
      onUpload({ filename, data: base64Data });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-xl mb-4">上传照片</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
        <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded-lg mr-2">上传</button>
        <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded-lg">取消</button>
      </div>
    </div>
  );
};

export default UploadPhotoModal;