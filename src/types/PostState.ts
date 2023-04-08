import { Timestamp } from "firebase/firestore";

export type Post = {
  id: string;
  communityId: string;
  communityImageURL?: string;
  authorDisplayText: string;
  creatorId: string;
  title: string;
  body: string;
  link: string;
  numberOfComments: number;
  voteStatus: number;
  currentUserVoteStatus?: {
    id: string;
    voteValue: number;
  };
  mediaType?: "image" | "video";
  mediaURL?: string;
  postIdx?: number;
  createdAt?: Timestamp;
  editedAt?: Timestamp;
};

export type PostVote = {
  id?: string;
  postId: string;
  communityId: string;
  voteValue: number;
};

export type PostState = {
  selectedPost: Post | null;
  posts: Post[];
  postVotes: PostVote[];
  postsCache: {
    [key: string]: Post[];
  };
  postUpdateRequired: boolean;
};
