import { atom } from "recoil";

import { PostState } from "../types/PostState";

export const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
  postVotes: [],
  postsCache: {},
  postUpdateRequired: true,
};

export const postState = atom<PostState>({
  key: "postState",
  default: defaultPostState,
});
