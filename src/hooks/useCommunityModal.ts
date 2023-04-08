import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

import { authModalState } from "../atoms/authModalAtom";
import { communityModalState } from "../atoms/communityModalAtom";
import { auth } from "../firebase/clientApp";

const useCommunityModal = () => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const setCommunityModalState = useSetRecoilState(communityModalState);

  const openModal = () => {
    // check for user to open auth modal before redirecting to submit
    if (!user?.uid) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    setCommunityModalState((prev) => ({ ...prev, open: true }));
  };

  const closeModal = () => {
    setCommunityModalState((prev) => ({ ...prev, open: false }));
  };

  return { openModal, closeModal };
};

export default useCommunityModal;
