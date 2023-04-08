import { FC } from "react";
import { FaReddit } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";

import { Box, Flex, Icon, MenuItem, Text } from "@chakra-ui/react";

import useCommunityModal from "../../../hooks/useCommunityModal";
import { CommunitySnippet } from "../../../types/CommunityState";
import MenuListItem from "./MenuListItem";

type MyCommunitiesProps = {
  snippets: CommunitySnippet[];
};

const MyCommunities: FC<MyCommunitiesProps> = ({ snippets }) => {
  const { openModal } = useCommunityModal();

  return (
    <Box mt={3} mb={3}>
      <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
        MY COMMUNITIES
      </Text>
      <MenuItem width="100%" fontSize="10pt" _hover={{ bg: "gray.100" }} onClick={openModal}>
        <Flex alignItems="center">
          <Icon fontSize={20} mr={2} as={GrAdd} />
          Create Community
        </Flex>
      </MenuItem>
      {snippets.map((snippet) => (
        <MenuListItem
          key={snippet.communityId}
          icon={FaReddit}
          displayText={`r/${snippet.communityId}`}
          link={`/r/${snippet.communityId}`}
          iconColor="blue.500"
          imageURL={snippet.imageURL}
        />
      ))}
    </Box>
  );
};
export default MyCommunities;
