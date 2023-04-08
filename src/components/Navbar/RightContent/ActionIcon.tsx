import { FC } from "react";

import { Flex, Icon } from "@chakra-ui/react";

type ActionIcon = {
  icon: any;
  size: number;
  onClick?: any;
};

const ActionIcon: FC<ActionIcon> = ({ icon, size }) => {
  return (
    <Flex mr={1.5} ml={1.5} padding={1} cursor="pointer" _hover={{ bg: "gray.200" }}>
      <Icon as={icon} fontSize={size} />
    </Flex>
  );
};
export default ActionIcon;
