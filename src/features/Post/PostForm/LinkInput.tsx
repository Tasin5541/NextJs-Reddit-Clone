import { Dispatch, FC, SetStateAction } from "react";
import { BsLink45Deg } from "react-icons/bs";

import { Button, Flex, Icon, Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react";
import Microlink from "@microlink/react";

type LinkInputProps = {
  linkText: string;
  setLinkText: Dispatch<SetStateAction<string>>;
};

const LinkInput: FC<LinkInputProps> = ({ linkText, setLinkText }) => {
  return (
    <Flex direction="column" justify="center" align="center" width="100%">
      {linkText ? (
        <>
          <Microlink style={{ width: "100%" }} url={linkText} />
          <Stack direction="row" mt={4}>
            <Button variant="outline" height="28px" onClick={() => setLinkText("")}>
              Remove
            </Button>
          </Stack>
        </>
      ) : (
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={BsLink45Deg} />
          </InputLeftElement>
          <Input
            name="link"
            value={linkText}
            onChange={(event) => setLinkText(event.target.value)}
            _placeholder={{ color: "gray.500" }}
            _focus={{
              outline: "none",
              bg: "white",
              border: "1px solid",
              borderColor: "black",
            }}
            fontSize="10pt"
            borderRadius={4}
            placeholder="Link"
          />
        </InputGroup>
      )}
    </Flex>
  );
};

export default LinkInput;
