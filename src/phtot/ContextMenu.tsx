import React from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  onDelete: () => void;
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onDelete, onClose }) => {
  return (
    <div
      className="fixed bg-white border border-gray-300 rounded shadow-lg"
      style={{ top: y, left: x }}
      onMouseLeave={onClose}
    >
      <button
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={onDelete}
      >
        删除
      </button>
    </div>
  );
};

export default ContextMenu;