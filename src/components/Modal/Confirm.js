import React, { useState } from "react";

// Custom Modal component
const Modal = ({ isOpen, onClose, onConfirm, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        {children}
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

// ConfirmModal component
export const ConfirmModal = ({ children, onConfirm }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <div>
      <div onClick={openModal}>{children}</div>
      <Modal isOpen={isOpen} onClose={closeModal} onConfirm={handleConfirm}>
        <h2 className="text-xl font-bold">Are you sure?</h2>
        <p className="mt-2 text-sm text-gray-600">
          This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};
