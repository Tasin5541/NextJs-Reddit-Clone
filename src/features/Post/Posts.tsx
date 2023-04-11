import { FC, useEffect, useState } from "react";

import { Stack } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useRouter } from "next/router";

import PostLoader from "../../components/Loader/PostLoader";
import { firestore } from "../../firebase/clientApp";
import usePosts from "../../hooks/usePosts";
import { Community } from "../../types/CommunityState";
import { Post } from "../../types/PostState";
import PostItem from "./PostItem";

type PostsProps = {
  communityData?: Community;
  userId?: string;
  loadingUser: boolean;
};

const Posts: FC<PostsProps> = ({ communityData, userId, loadingUser }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { postStateValue, setPostStateValue, onVote, onDeletePost } = usePosts(communityData!);

  const onSelectPost = (post: Post, postIdx: number) => {
    setPostStateValue((prev) => ({
      ...prev,
      selectedPost: { ...post, postIdx },
    }));
    router.push(`/r/${communityData?.id!}/comments/${post.id}`);
  };

  useEffect(() => {
    if (postStateValue.postsCache[communityData?.id!] && !postStateValue.postUpdateRequired) {
      setPostStateValue((prev) => ({
        ...prev,
        posts: postStateValue.postsCache[communityData?.id!],
      }));
      return;
    }

    getPosts();
    /**
     * REAL-TIME POST LISTENER
     * IMPLEMENT AT FIRST THEN CHANGE TO POSTS CACHE
     *
     * UPDATE - MIGHT KEEP THIS AS CACHE IS TOO COMPLICATED
     *
     * LATEST UPDATE - FOUND SOLUTION THAT MEETS IN THE MIDDLE
     * CACHE POST DATA, BUT REMOVE POSTVOTES CACHE AND HAVE
     * REAL-TIME LISTENER ON POSTVOTES
     */
    // const postsQuery = query(
    //   collection(firestore, "posts"),
    //   where("communityId", "==", communityData.id),
    //   orderBy("createdAt", "desc")
    // );
    // const unsubscribe = onSnapshot(postsQuery, (querySnaption) => {
    //   const posts = querySnaption.docs.map((post) => ({
    //     id: post.id,
    //     ...post.data(),
    //   }));
    //   setPostItems((prev) => ({
    //     ...prev,
    //     posts: posts as [],
    //   }));
    //   setLoading(false);
    // });

    // // Remove real-time listener on component dismount
    // return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityData, postStateValue.postUpdateRequired]);

  const getPosts = async () => {
    // console.log("WE ARE GETTING POSTS!!!");

    setLoading(true);
    try {
      const postsQuery = query(collection(firestore, "posts"), where("communityId", "==", communityData?.id!), orderBy("createdAt", "desc"));
      const postDocs = await getDocs(postsQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
        postsCache: {
          ...prev.postsCache,
          [communityData?.id!]: posts as Post[],
        },
        postUpdateRequired: false,
      }));
    } catch (error: any) {
      // console.log("getPosts error", error.message);
    }
    setLoading(false);
  };

  // console.log("HERE IS POST STATE", postStateValue);

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postStateValue.posts.map((post: Post, index) => (
            <PostItem
              key={post.id}
              post={post}
              onVote={onVote}
              onDeletePost={onDeletePost}
              userVoteValue={postStateValue.postVotes.find((item) => item.postId === post.id)?.voteValue}
              userIsCreator={userId === post.creatorId}
              onSelectPost={onSelectPost}
            />
          ))}
        </Stack>
      )}
    </>
  );
};
export default Posts;
