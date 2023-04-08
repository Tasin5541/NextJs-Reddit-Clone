import { FC } from "react";

import { Box, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";

type PostLoaderProps = {
  skeletonCount?: number;
};

const PostLoader: FC<PostLoaderProps> = ({ skeletonCount = 2 }) => {
  return (
    <Stack spacing={6}>
      {Array.from(Array(skeletonCount)).map((_, index) => (
        <Box key={index} padding="10px 10px" boxShadow="lg" bg="white" borderRadius={4}>
          <SkeletonText mt="4" noOfLines={1} width="40%" spacing="4" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
          <Skeleton mt="4" height="200px" />
        </Box>
      ))}
    </Stack>
  );
};
export default PostLoader;
