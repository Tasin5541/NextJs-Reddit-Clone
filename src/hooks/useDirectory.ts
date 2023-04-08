import { useEffect } from "react";
import { FaReddit } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";

import { useRouter } from "next/router";

import { communityState } from "../atoms/communitiesAtom";
import { defaultMenuItem, directoryMenuState } from "../atoms/directoryMenuAtom";
import { DirectoryMenuItem } from "../types/DirectoryMenuState";

const useDirectory = () => {
  const [directoryState, setDirectoryState] = useRecoilState(directoryMenuState);
  const router = useRouter();

  const communityStateValue = useRecoilValue(communityState);

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));

    router?.push(menuItem.link);
    if (directoryState.isOpen) {
      toggleMenuOpen();
    }
  };

  const toggleMenuOpen = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !directoryState.isOpen,
    }));
  };

  useEffect(() => {
    const existingCommunity = communityStateValue.currentCommunity;

    if (existingCommunity.id) {
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: {
          displayText: `r/${existingCommunity.id}`,
          link: `r/${existingCommunity.id}`,
          icon: FaReddit,
          iconColor: "blue.500",
          imageURL: existingCommunity.imageURL,
        },
      }));
      return;
    }
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: defaultMenuItem,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityStateValue.currentCommunity]);

  return { directoryState, onSelectMenuItem, toggleMenuOpen };
};

export default useDirectory;
