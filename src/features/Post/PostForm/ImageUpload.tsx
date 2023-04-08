import { FC } from "react";

import { Box, Button, Flex, Image, Stack } from "@chakra-ui/react";

type ImageUploadProps = {
  selectedFile?: string;
  setSelectedFile: (value: string) => void;
  selectFileRef: React.RefObject<HTMLInputElement>;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageUpload: FC<ImageUploadProps> = ({ selectedFile, setSelectedFile, selectFileRef, onSelectImage }) => {
  return (
    <Flex direction="column" justify="center" align="center" width="100%">
      {selectedFile ? (
        <>
          {selectedFile.includes("video") ? (
            <Box
              as="video"
              controls
              src={selectedFile as string}
              objectFit="contain"
              sx={{
                aspectRatio: "16/9",
              }}
            />
          ) : (
            <Image src={selectedFile as string} maxWidth="400px" maxHeight="400px" alt="post image" />
          )}
          <Stack direction="row" mt={4}>
            <Button variant="outline" height="28px" onClick={() => setSelectedFile("")}>
              Remove
            </Button>
          </Stack>
        </>
      ) : (
        <Flex justify="center" align="center" p={20} border="1px dashed" borderColor="gray.200" borderRadius={4} width="100%">
          <Button variant="outline" height="28px" onClick={() => selectFileRef.current?.click()}>
            {`Upload (<20MB)`}
          </Button>
          <input id="file-upload" type="file" accept="image/x-png,image/gif,image/jpeg,video/mp4" hidden ref={selectFileRef} onChange={onSelectImage} />
        </Flex>
      )}
    </Flex>
  );
};
export default ImageUpload;
