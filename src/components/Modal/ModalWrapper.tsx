import { FC, ReactNode } from "react";

import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";

type ModalWrapperProps = {
  children?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const ModalWrapper: FC<ModalWrapperProps> = ({ children, isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent width={{ base: "sm", md: "xl" }}>{children}</ModalContent>
      </Modal>
    </>
  );
};
export default ModalWrapper;
