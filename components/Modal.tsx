import { useState } from 'react';
interface ModalProps {
  onSave: (newName: string) => void;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onSave, onClose }) => {
  const [newName, setNewName] = useState('');
  const [state, setState] = useState<string>(''); 

  const handleSave = () => {
    onSave(newName);
  };

  return (
    <div className="flex items-center space-x-2">
    <input
      type="text"
      value={newName}
      onChange={(e) => setNewName(e.target.value)}
      className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 text-black"
    />
    <button
      onClick={handleSave}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
    >
      Save
    </button>
    <button
      onClick={onClose}
      className="bg-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
    >
      Cancel
    </button>
  </div>
  );
};

export default Modal;
