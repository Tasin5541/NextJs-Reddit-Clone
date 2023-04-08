import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

import router from "next/router";

import { authModalState } from "../atoms/authModalAtom";
import { auth } from "../firebase/clientApp";
import useDirectory from "./useDirectory";

const useCreatePost = () => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const { toggleMenuOpen } = useDirectory();

  const onClick = () => {
    // check for user to open auth modal before redirecting to submit
    if (!user?.uid) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    const { community } = router.query;
    if (community) {
      router.push(`/r/${router.query.community}/submit`);
      return;
    }
    // Open directory menu to select community to post to
    toggleMenuOpen();
  };

  return { onClick };
};

export default useCreatePost;
