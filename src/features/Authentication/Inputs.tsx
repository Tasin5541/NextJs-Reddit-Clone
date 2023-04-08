import { FC } from "react";
import { useRecoilValue } from "recoil";

import { Flex } from "@chakra-ui/react";

import { authModalState } from "../../atoms/authModalAtom";
import { ModalView } from "../../types/AuthModalState";
import Login from "./Login";
import SignUp from "./SignUp";

type AuthInputsProps = {
  toggleView: (view: ModalView) => void;
};

const AuthInputs: FC<AuthInputsProps> = ({ toggleView }) => {
  const modalState = useRecoilValue(authModalState);

  return (
    <Flex direction="column" alignItems="center" width="100%" mt={4}>
      {modalState.view === "login" ? <Login toggleView={toggleView} /> : <SignUp toggleView={toggleView} />}
    </Flex>
  );
};
export default AuthInputs;
