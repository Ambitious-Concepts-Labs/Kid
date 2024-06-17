import React, { createContext, useContext, useState } from "react";

const ConfettiContext = createContext();

export const ConfettiProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <ConfettiContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </ConfettiContext.Provider>
  );
};

export const useConfettiStore = () => {
  return useContext(ConfettiContext);
};
