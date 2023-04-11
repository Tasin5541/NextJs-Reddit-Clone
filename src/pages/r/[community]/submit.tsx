import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

import { Box, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { communityState } from "../../../atoms/communitiesAtom";
import PageContentLayout from "../../../components/Layout/PageContent";
import About from "../../../features/Community/About";
import NewPostForm from "../../../features/Post/PostForm/NewPostForm";
import { auth } from "../../../firebase/clientApp";
import useCommunityData from "../../../hooks/useCommunityData";

const CreateCommmunityPostPage: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const router = useRouter();
  const communityStateValue = useRecoilValue(communityState);
  const { loading } = useCommunityData();

  useEffect(() => {
    if (!user && !loadingUser && communityStateValue.currentCommunity.id) {
      router.push(`/r/${communityStateValue.currentCommunity.id}`);
    }
  }, [user, loadingUser, communityStateValue.currentCommunity, router]);

  // console.log("HERE IS USER", user, loadingUser);

  return (
    <PageContentLayout maxWidth="1060px">
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text fontWeight={600}>Create a post</Text>
        </Box>
        {user && <NewPostForm communityId={communityStateValue.currentCommunity.id} communityImageURL={communityStateValue.currentCommunity.imageURL} user={user} />}
      </>
      {communityStateValue.currentCommunity && (
        <>
          <About communityData={communityStateValue.currentCommunity} pt={6} onCreatePage loading={loading} />
        </>
      )}
    </PageContentLayout>
  );
};

export default CreateCommmunityPostPage;
