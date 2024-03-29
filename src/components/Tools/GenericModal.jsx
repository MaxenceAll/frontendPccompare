import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { STYLEDContainer, STYLEDContainerBox } from "../styles/genericContainer";

const GenericModal = ({ children, isOpen, onClose, props }) => {
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setIsClosing(false);
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} aria-label={props?.ariaLabelMessage}>
      <ModalContent isClosing={isClosing} ref={modalRef}>
        {/* Close button */}
        <CloseButton onClick={handleClose}>X</CloseButton>

        <STYLEDContainer>
          <STYLEDContainerBox>{children}</STYLEDContainerBox>
        </STYLEDContainer>
      </ModalContent>
    </ModalWrapper>
  );
};

export default GenericModal;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalWrapper = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.85);
  animation: ${fadeIn} 1s ease-in-out;
  z-index: 99999999;
`;

const ModalContent = styled.div`
  background-color: var(--background-color-200);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  padding: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 16px;
  font-weight: bold;
  color: var(--text-color-200);
  background: none;
  border: none;
  cursor: pointer;
   &:hover{
    color: red;
   }
   border: 1px solid var(--main-color-100);
`;

