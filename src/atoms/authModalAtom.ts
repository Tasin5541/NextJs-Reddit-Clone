import { atom } from "recoil";

import { AuthModalState } from "../types/AuthModalState";

const defaultModalState: AuthModalState = {
  open: false,
  view: "login",
};

export const authModalState = atom<AuthModalState>({
  key: "authModalState",
  default: defaultModalState,
});
