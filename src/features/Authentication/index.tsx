/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useRecoilValue } from "recoil";

import { Flex, ModalBody, ModalCloseButton, ModalHeader, Spinner, Text } from "@chakra-ui/react";

import { authModalState } from "../../atoms/authModalAtom";
import { userState } from "../../atoms/userAtom";
import ModalWrapper from "../../components/Modal/ModalWrapper";
import { auth } from "../../firebase/clientApp";
import AuthInputs from "./Inputs";
import OAuthButtons from "./OAuthButtons";
import ResetPassword from "./ResetPassword";

type AuthModalProps = {};

const AuthModal: FC<AuthModalProps> = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const handleClose = () =>
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));

  const currentUser = useRecoilValue(userState);
  const [user, error] = useAuthState(auth);

  useEffect(() => {
    if (currentUser) handleClose();
  }, [currentUser]);

  const toggleView = (view: string) => {
    setModalState({
      ...modalState,
      view: view as typeof modalState.view,
    });
  };

  useEffect(() => {
    if (user) handleClose();
  }, [user]);

  return (
    <ModalWrapper isOpen={modalState.open} onClose={handleClose}>
      <ModalHeader display="flex" flexDirection="column" alignItems="center">
        {modalState.view === "login" && "Login"}
        {modalState.view === "signup" && "Sign Up"}
        {modalState.view === "resetPassword" && "Reset Password"}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody display="flex" flexDirection="column" alignItems="center" justifyContent="center" pb={6}>
        <Flex direction="column" alignItems="center" justifyContent="center" width="70%">
          {modalState.view === "login" || modalState.view === "signup" ? (
            <>
              <OAuthButtons />
              OR
              <AuthInputs toggleView={toggleView} />
            </>
          ) : (
            <ResetPassword toggleView={toggleView} />
          )}
          {user && !currentUser && (
            <>
              <Spinner size="lg" mt={2} mb={2} />
              <Text fontSize="8pt" textAlign="center" color="blue.500">
                You are logged in. You will be redirected soon
              </Text>
            </>
          )}
        </Flex>
      </ModalBody>
    </ModalWrapper>
  );
};
export default AuthModal;
