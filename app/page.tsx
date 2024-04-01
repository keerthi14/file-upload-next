'use client' 
import { useState } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';


const API_URL = 'https://example.com/';

const Home: React.FC = () => {
  const [fileList, setFileList] = useState<{ file: File; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [renameIndex, setRenameIndex] = useState<number | null>(null);
 

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB!');
      } else {
        setFileList(prevList => [...prevList, { file, name: file.name }]);
        uploadFile(file);
      }
    }
  };

  const uploadFile = async (file: File) => {
    setIsLoading(true);
    try {
      const response = await axios.post(API_URL, { event: 'uploadFail', filename: file.name });
       } catch (error:any) {
     if (error.response) {
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
          console.log('Error', error.message);
      }
      console.log(error.config);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRename = (index: number) => {
    setRenameIndex(index);
    setIsModalOpen(true);
  };

  const handleSaveRename = (newName: string) => {
    const updatedFiles = [...fileList];
    updatedFiles[renameIndex!] = { ...updatedFiles[renameIndex!], name: newName };
    setFileList(updatedFiles);
    setIsModalOpen(false);
  };

  const handleDelete = (index: number) => {
    const updatedFiles = [...fileList];
    updatedFiles.splice(index, 1);
    setFileList(updatedFiles);
  };

  return (
    <div className="p-4">
      <input type="file" className="border border-gray-300 rounded px-4 py-2 mb-4" onChange={handleFileChange} />
      {isLoading && <p>Uploading...</p>}
      <ul>
  {isLoading ? (
    <li className="animate-pulse bg-gray-200 rounded p-4 mb-2">Skeleton...</li>
  ) : (
    fileList.map(({ file, name }, index) => (
      <li key={index} className="flex items-center justify-between bg-black rounded p-4 mb-2">
        <span>{name}</span>
        <div>
          <button onClick={() => handleRename(index)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Rename</button>
          <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
        </div>
      </li>
    ))
  )}
</ul>
      {isModalOpen && (
        <Modal onSave={handleSaveRename} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default Home;
