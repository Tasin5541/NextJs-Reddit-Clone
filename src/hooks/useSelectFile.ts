import { useState } from "react";

const useSelectFile = () => {
  const [selectedFile, setSelectedFile] = useState<string>();

  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("THIS IS HAPPENING", event);

    const reader = new FileReader();

    if (event.target.files?.[0]) {
      if (event.target.files?.[0].size < 1048576 * 20) {
        reader.readAsDataURL(event.target.files[0]);
      } else {
        alert("File is too big!");
      }
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  return {
    selectedFile,
    setSelectedFile,
    onSelectFile,
  };
};
export default useSelectFile;
