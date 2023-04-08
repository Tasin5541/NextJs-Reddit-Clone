import { Dispatch, FC, SetStateAction } from "react";

import { Stack, Textarea } from "@chakra-ui/react";

type TextInputsProps = {
  textInputs: string;
  setTextInputs: Dispatch<SetStateAction<string>>;
};

const TextInputs: FC<TextInputsProps> = ({ textInputs, setTextInputs }) => {
  return (
    <Stack spacing={3} width="100%">
      <Textarea
        name="body"
        value={textInputs}
        onChange={(event) => setTextInputs(event.target.value)}
        fontSize="10pt"
        placeholder="Text (optional)"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black",
        }}
        height="100px"
      />
    </Stack>
  );
};
export default TextInputs;
