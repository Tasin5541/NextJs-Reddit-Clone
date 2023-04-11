/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

import { Stack } from "@chakra-ui/react";
import { collection, getDocs, limit, onSnapshot, orderBy, query, QueryConstraint, where } from "firebase/firestore";
import type { NextPage } from "next";

import { communityState } from "../atoms/communitiesAtom";
import PageContentLayout from "../components/Layout/PageContent";
import PostLoader from "../components/Loader/PostLoader";
import CreatePostLink from "../features/Community/CreatePostLink";
import PersonalHome from "../features/Community/PersonalHome";
import Premium from "../features/Community/Premium";
import Recommendations from "../features/Community/Recommendations";
import PostItem from "../features/Post/PostItem";
import { auth, firestore } from "../firebase/clientApp";
import usePosts from "../hooks/usePosts";
import { Post, PostVote } from "../types/PostState";

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const { postStateValue, setPostStateValue, onVote, onSelectPost, onDeletePost, loading, setLoading } = usePosts();
  const communityStateValue = useRecoilValue(communityState);

  const getUserHomePosts = async () => {
    // console.log("GETTING USER FEED");
    setLoading(true);
    try {
      /**
       * if snippets has no length (i.e. user not in any communities yet)
       * do query for 10 posts ordered by createdAt
       */
      const feedPosts: Post[] = [];

      const queryConstraints: QueryConstraint[] = [orderBy("createdAt", "desc"), limit(10)];

      // User has joined communities
      if (communityStateValue.mySnippets.length) {
        // console.log("GETTING POSTS IN USER COMMUNITIES");

        const myCommunityIds = communityStateValue.mySnippets.map((snippet) => snippet.communityId);
        queryConstraints.push(where("communityId", "in", myCommunityIds));
      }

      const postQuery = query(collection(firestore, "posts"), ...queryConstraints);
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      feedPosts.push(...posts);

      // console.log("HERE ARE FEED POSTS", feedPosts);

      setPostStateValue((prev) => ({
        ...prev,
        posts: feedPosts,
      }));
    } catch (error: any) {
      // console.log("getUserHomePosts error", error.message);
    }
    setLoading(false);
  };

  const getNoUserHomePosts = async () => {
    // console.log("GETTING NO USER FEED");
    setLoading(true);
    try {
      const postQuery = query(collection(firestore, "posts"), orderBy("voteStatus", "desc"), limit(10));
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log("NO USER FEED", posts);

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error: any) {
      // console.log("getNoUserHomePosts error", error.message);
    }
    setLoading(false);
  };

  const getUserPostVotes = async () => {
    const postIds = postStateValue.posts.map((post) => post.id);
    const postVotesQuery = query(collection(firestore, `users/${user?.uid}/postVotes`), where("postId", "in", postIds));
    const unsubscribe = onSnapshot(postVotesQuery, (querySnapshot) => {
      const postVotes = querySnapshot.docs.map((postVote) => ({
        id: postVote.id,
        ...postVote.data(),
      }));

      setPostStateValue((prev) => ({
        ...prev,
        postVotes: postVotes as PostVote[],
      }));
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    /**
     * initSnippetsFetched ensures that user snippets have been retrieved;
     * the value is set to true when snippets are first retrieved inside
     * of getSnippets in useCommunityData
     */
    if (!communityStateValue.initSnippetsFetched) return;

    if (user) {
      getUserHomePosts();
    }
  }, [user, communityStateValue.initSnippetsFetched]);

  useEffect(() => {
    if (!user && !loadingUser) {
      getNoUserHomePosts();
    }
  }, [user, loadingUser]);

  useEffect(() => {
    if (!user?.uid || !postStateValue.posts.length) return;
    getUserPostVotes();

    // Clear postVotes on dismount
    return () => {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
    };
  }, [postStateValue.posts, user?.uid]);

  return (
    <PageContentLayout>
      <>
        <CreatePostLink />
        {loading ? (
          <PostLoader />
        ) : (
          <Stack>
            {postStateValue.posts.map((post: Post, index) => (
              <PostItem
                key={post.id}
                post={post}
                postIdx={index}
                onVote={onVote}
                onDeletePost={onDeletePost}
                userVoteValue={postStateValue.postVotes.find((item) => item.postId === post.id)?.voteValue}
                userIsCreator={user?.uid === post.creatorId}
                onSelectPost={onSelectPost}
                homePage
              />
            ))}
          </Stack>
        )}
      </>
      <Stack spacing={5} position="sticky" top="14px">
        <Recommendations />
        <Premium />
        <PersonalHome />
      </Stack>
    </PageContentLayout>
  );
};

export default Home;
