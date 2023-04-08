import { FC } from "react";

import { Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { User } from "firebase/auth";

import AuthButtons from "../../../components/Navbar/RightContent/AuthButtons";

type CommentInputProps = {
  comment: string;
  setComment: (value: string) => void;
  loading: boolean;
  user?: User | null;
  onCreateComment: (comment: string) => void;
};

const CommentInput: FC<CommentInputProps> = ({ comment, setComment, loading, user, onCreateComment }) => {
  return (
    <Flex direction="column" position="relative">
      {user ? (
        <>
          <Text mb={1}>
            Comment as <span style={{ color: "#3182CE" }}>{user?.email?.split("@")[0]}</span>
          </Text>
          <Textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="What are your thoughts?"
            fontSize="10pt"
            borderRadius={4}
            minHeight="160px"
            pb={10}
            _placeholder={{ color: "gray.500" }}
            _focus={{
              outline: "none",
              bg: "white",
              border: "1px solid black",
            }}
          />
          <Flex position="absolute" left="1px" right="1px" bottom="1px" justify="flex-end" zIndex={1} bg="gray.100" p="6px 8px" borderRadius="0px 0px 4px 4px">
            <Button height="26px" isDisabled={!comment?.trim().length} isLoading={loading} onClick={() => onCreateComment(comment)}>
              Comment
            </Button>
          </Flex>
        </>
      ) : (
        <Flex align="center" justify="space-between" borderRadius={2} border="1px solid" borderColor="gray.100" p={4}>
          <Text fontWeight={600}>Log in or sign up to leave a comment</Text>
          <AuthButtons />
        </Flex>
      )}
    </Flex>
  );
};
export default CommentInput;
