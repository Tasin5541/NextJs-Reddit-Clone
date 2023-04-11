import { FC, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

import PageContentLayout from "../../../../components/Layout/PageContent";
import PostLoader from "../../../../components/Loader/PostLoader";
import About from "../../../../features/Community/About";
import Comments from "../../../../features/Post/Comments";
import PostItem from "../../../../features/Post/PostItem";
import { auth, firestore } from "../../../../firebase/clientApp";
import useCommunityData from "../../../../hooks/useCommunityData";
import usePosts from "../../../../hooks/usePosts";
import { Post } from "../../../../types/PostState";

type PostPageProps = {};

const PostPage: FC<PostPageProps> = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { community, pid } = router.query;
  const { communityStateValue } = useCommunityData();

  // Need to pass community data here to see if current post [pid] has been voted on
  const { postStateValue, setPostStateValue, onDeletePost, loading, setLoading, onVote } = usePosts(communityStateValue.currentCommunity);

  const fetchPost = async () => {
    // console.log("FETCHING POST");

    setLoading(true);
    try {
      const postDocRef = doc(firestore, "posts", pid as string);
      const postDoc = await getDoc(postDocRef);
      setPostStateValue((prev) => ({
        ...prev,
        selectedPost: { id: postDoc.id, ...postDoc.data() } as Post,
      }));
    } catch (error: any) {
      // console.log("fetchPost error", error.message);
    }
    setLoading(false);
  };

  // Fetch post if not in already in state
  useEffect(() => {
    const { pid } = router.query;

    if (pid && !postStateValue.selectedPost) {
      fetchPost();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query, postStateValue.selectedPost]);

  return (
    <PageContentLayout>
      {/* Left Content */}
      <>
        {loading ? (
          <PostLoader skeletonCount={1} />
        ) : (
          <>
            {postStateValue.selectedPost && (
              <>
                <PostItem
                  post={postStateValue.selectedPost}
                  // postIdx={postStateValue.selectedPost.postIdx}
                  onVote={onVote}
                  onDeletePost={onDeletePost}
                  userVoteValue={postStateValue.postVotes.find((item) => item.postId === postStateValue.selectedPost!.id)?.voteValue}
                  userIsCreator={user?.uid === postStateValue.selectedPost.creatorId}
                  router={router}
                />
                <Comments user={user} community={community as string} selectedPost={postStateValue.selectedPost} />
              </>
            )}
          </>
        )}
      </>
      {/* Right Content */}
      <>
        <About communityData={communityStateValue.currentCommunity} loading={loading} />
      </>
    </PageContentLayout>
  );
};
export default PostPage;
