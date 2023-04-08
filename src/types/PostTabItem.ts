import { Icon } from "@chakra-ui/react";

export type PostTabItem = {
  title: string;
  icon: typeof Icon.arguments;
  disabled: boolean;
};
