import { FC } from "react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon, Image, Menu, MenuButton, MenuList, Text } from "@chakra-ui/react";

import useDirectory from "../../../hooks/useDirectory";
import Communities from "./Communities";

const Directory: FC = () => {
  const { directoryState, toggleMenuOpen } = useDirectory();

  return (
    <Menu isOpen={directoryState.isOpen}>
      {({ isOpen }) => (
        <>
          <MenuButton
            cursor="pointer"
            padding="0px 6px"
            borderRadius="4px"
            _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
            mr={2}
            ml={{ base: 0, md: 2 }}
            onClick={toggleMenuOpen}
          >
            <Flex alignItems="center" justifyContent="space-between" width={{ base: "auto", lg: "200px" }}>
              <Flex alignItems="center">
                <>
                  {directoryState.selectedMenuItem.imageURL ? (
                    <Image borderRadius="full" boxSize="24px" src={directoryState.selectedMenuItem.imageURL} mr={2} alt="directory image" />
                  ) : (
                    <Icon fontSize={24} mr={{ base: 1, md: 2 }} color={directoryState.selectedMenuItem.iconColor} as={directoryState.selectedMenuItem.icon} />
                  )}
                  <Box display={{ base: "none", lg: "flex" }} flexDirection="column" fontSize="10pt">
                    <Text fontWeight={600}>{directoryState.selectedMenuItem.displayText}</Text>
                  </Box>
                </>
              </Flex>
              <ChevronDownIcon color="gray.500" />
            </Flex>
          </MenuButton>
          <MenuList maxHeight="300px" overflow="scroll" overflowX="hidden">
            <Communities />
          </MenuList>
        </>
      )}
    </Menu>
  );
};
export default Directory;
