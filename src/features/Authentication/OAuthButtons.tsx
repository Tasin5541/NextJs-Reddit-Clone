import { FC, useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import { Button, Flex, Image, Text } from "@chakra-ui/react";

import { auth } from "../../firebase/clientApp";
import { CreateUpdateUser } from "../../helpers/CreateUpdateUser";

type OAuthButtonsProps = {};

const OAuthButtons: FC<OAuthButtonsProps> = () => {
  const [signInWithGoogle, userCred, loading, error] = useSignInWithGoogle(auth);

  useEffect(() => {
    if (userCred) {
      CreateUpdateUser(userCred.user);
    }
  }, [userCred]);

  return (
    <Flex direction="column" mb={4} width="100%">
      <Button variant="oauth" mb={2} onClick={() => signInWithGoogle()} isLoading={loading}>
        <Image src="/images/googlelogo.png" height="20px" mr={4} alt="Continue with Google" />
        Continue with Google
      </Button>
      <Button variant="oauth">Some Other Provider</Button>
      {error && (
        <Text textAlign="center" fontSize="10pt" color="red" mt={2}>
          {error.message}
        </Text>
      )}
    </Flex>
  );
};
export default OAuthButtons;
