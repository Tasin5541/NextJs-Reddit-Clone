import { FC } from "react";
import { useSetRecoilState } from "recoil";

import { Button } from "@chakra-ui/react";

import { authModalState } from "../../../atoms/authModalAtom";

type AuthButtonsProps = {};

const AuthButtons: FC<AuthButtonsProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <>
      <Button
        variant="outline"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() => setAuthModalState({ open: true, view: "login" })}
      >
        Log In
      </Button>
      <Button
        variant="solid"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() => setAuthModalState({ open: true, view: "signup" })}
      >
        Sign Up
      </Button>
    </>
  );
};
export default AuthButtons;
