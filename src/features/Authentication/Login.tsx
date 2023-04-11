import { FC, useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import { Button, Flex, Text } from "@chakra-ui/react";

import InputItem from "../../chakra/components/InputItem";
import { auth } from "../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../firebase/errors";
import { CreateUpdateUser } from "../../helpers/CreateUpdateUser";
import { ModalView } from "../../types/AuthModalState";

type LoginProps = {
  toggleView: (view: ModalView) => void;
};

const Login: FC<LoginProps> = ({ toggleView }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");

  const [signInWithEmailAndPassword, userCred, loading, authError] = useSignInWithEmailAndPassword(auth);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formError) setFormError("");
    if (!form.email.includes("@")) {
      return setFormError("Please enter a valid email");
    }

    // Valid form inputs
    signInWithEmailAndPassword(form.email, form.password);
  };

  const onChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    // console.log(userCred);
    if (userCred) {
      CreateUpdateUser(userCred.user);
    }
  }, [userCred]);

  return (
    <form onSubmit={onSubmit}>
      <InputItem name="email" placeholder="email" type="text" mb={2} onChange={onChange} />
      <InputItem name="password" placeholder="password" type="password" onChange={onChange} />
      <Text textAlign="center" mt={2} fontSize="10pt" color="red">
        {formError || FIREBASE_ERRORS[authError?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Button width="100%" height="36px" mb={2} mt={2} type="submit" isLoading={loading}>
        Log In
      </Button>
      <Flex justifyContent="center" mb={2}>
        <Text fontSize="9pt" mr={1}>
          Forgot your password?
        </Text>
        <Text fontSize="9pt" color="blue.500" cursor="pointer" onClick={() => toggleView("resetPassword")}>
          Reset
        </Text>
      </Flex>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>New here?</Text>
        <Text color="blue.500" fontWeight={700} cursor="pointer" onClick={() => toggleView("signup")}>
          SIGN UP
        </Text>
      </Flex>
    </form>
  );
};
export default Login;
