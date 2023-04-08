import { IconType } from "react-icons";

export type DirectoryMenuItem = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
};

export type DirectoryMenuState = {
  isOpen: boolean;
  selectedMenuItem: DirectoryMenuItem;
};
