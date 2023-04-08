import { FC } from "react";

import { Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";

import AuthModal from "../../../features/Authentication";
import AuthButtons from "./AuthButtons";
import Icons from "./Icons";
import MenuWrapper from "./ProfileMenu/MenuWrapper";

type RightContentProps = {
  user: User;
};

const RightContent: FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex justifyContent="space-between" alignItems="center">
        {user ? <Icons /> : <AuthButtons />}
        <MenuWrapper />
      </Flex>
    </>
  );
};
export default RightContent;
