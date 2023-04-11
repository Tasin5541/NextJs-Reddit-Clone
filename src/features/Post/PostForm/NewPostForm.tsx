import { FC, useRef, useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";

import { Button, Flex, Input, Stack } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRouter } from "next/router";

import { postState } from "../../../atoms/postsAtom";
import { firestore, storage } from "../../../firebase/clientApp";
import useSelectFile from "../../../hooks/useSelectFile";
import { PostTabItem } from "../../../types/PostTabItem";
import ImageUpload from "./ImageUpload";
import LinkInput from "./LinkInput";
import TabItem from "./TabItem";
import TextInputs from "./TextInputs";

const formTabs: PostTabItem[] = [
  {
    title: "Post",
    icon: IoDocumentText,
    disabled: false,
  },
  {
    title: "Images & Video",
    icon: IoImageOutline,
    disabled: false,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
    disabled: false,
  },
  {
    title: "Poll",
    icon: BiPoll,
    disabled: true,
  },
  {
    title: "Talk",
    icon: BsMic,
    disabled: true,
  },
];

type NewPostFormProps = {
  communityId: string;
  communityImageURL?: string;
  user: User;
};

const NewPostForm: FC<NewPostFormProps> = ({ communityId, communityImageURL, user }) => {
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [titleInput, setTitleInput] = useState("");
  const [textInputs, setTextInputs] = useState("");
  const [linkText, setLinkText] = useState("");
  const selectFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const setPostItems = useSetRecoilState(postState);

  const handleCreatePost = async () => {
    setLoading(true);
    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), {
        communityId,
        communityImageURL: communityImageURL || "",
        creatorId: user.uid,
        authorDisplayText: user.email!.split("@")[0],
        title: titleInput,
        body: selectedTab === "Post" ? textInputs : "",
        link: selectedTab === "Link" ? linkText : "",
        numberOfComments: 0,
        voteStatus: 0,
        createdAt: serverTimestamp(),
        editedAt: serverTimestamp(),
      });

      // console.log("HERE IS NEW POST ID", postDocRef.id);

      // check if selectedFile exists, if it does, do image processing
      if (selectedTab === "Images & Video" && selectedFile) {
        const mediaType = selectedFile.includes("video") ? "video" : "image";
        const imageRef = ref(storage, `posts/${postDocRef.id}/media`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(postDocRef, {
          mediaURL: downloadURL,
          mediaType,
        });
        // console.log("HERE IS DOWNLOAD URL", downloadURL);
      }

      // Clear the cache to cause a refetch of the posts
      setPostItems((prev) => ({
        ...prev,
        postUpdateRequired: true,
      }));
      router.back();
    } catch (error) {
      // console.log("createPost error", error);
      setError("Error creating post");
    }
    setLoading(false);
  };

  const getTabBody = (selectedTab: string) => {
    switch (selectedTab) {
      case "Post":
        return <TextInputs textInputs={textInputs} setTextInputs={setTextInputs} />;

      case "Images & Video":
        return <ImageUpload selectedFile={selectedFile} setSelectedFile={setSelectedFile} selectFileRef={selectFileRef} onSelectImage={onSelectFile} />;

      case "Link":
        return <LinkInput linkText={linkText} setLinkText={setLinkText} />;

      default:
        break;
    }
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item, index) => (
          <TabItem key={index} item={item} selected={item.title === selectedTab} setSelectedTab={setSelectedTab} />
        ))}
      </Flex>

      <Flex p={4} direction="column">
        <Stack spacing={3} width="100%">
          <Input
            name="title"
            value={titleInput}
            onChange={(event) => setTitleInput(event.target.value)}
            _placeholder={{ color: "gray.500" }}
            _focus={{
              outline: "none",
              bg: "white",
              border: "1px solid",
              borderColor: "black",
            }}
            fontSize="10pt"
            borderRadius={4}
            placeholder="Title"
          />
          {getTabBody(selectedTab)}
        </Stack>
        <Flex justify="flex-end">
          <Button height="34px" marginTop="0.75rem" padding="0px 30px" isDisabled={!titleInput.trim()} isLoading={loading} onClick={handleCreatePost}>
            Post
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default NewPostForm;
