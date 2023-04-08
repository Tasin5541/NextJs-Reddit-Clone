import { atom } from "recoil";

import { CommunityModalState } from "../types/CommunityModalState";

const defaultModalState: CommunityModalState = {
  open: false,
};

export const communityModalState = atom<CommunityModalState>({
  key: "communityModalState",
  default: defaultModalState,
});
