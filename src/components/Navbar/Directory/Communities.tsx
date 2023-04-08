import { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

import { communityState } from "../../../atoms/communitiesAtom";
import CreateCommunityModal from "../../../features/Community/CreateCommunity/CreateCommunityModal";
import { auth } from "../../../firebase/clientApp";
import Moderating from "./Moderating";
import MyCommunities from "./MyCommunities";

const Communities: FC = () => {
  const [user] = useAuthState(auth);
  const mySnippets = useRecoilValue(communityState).mySnippets;

  return (
    <>
      <CreateCommunityModal userId={user?.uid!} />
      <Moderating snippets={mySnippets.filter((item) => item.isModerator)} />
      <MyCommunities snippets={mySnippets} />
    </>
  );
};

export default Communities;
