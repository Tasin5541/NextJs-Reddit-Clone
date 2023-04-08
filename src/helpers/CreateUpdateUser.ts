import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { firestore } from "../firebase/clientApp";

// ignore specific user properties
const replacer = (key: string, value: any) => {
  if (key !== "stsTokenManager") {
    return value;
  }
  return undefined;
};

export const CreateUpdateUser = async (user: User) => {
  const userDocRef = doc(firestore, "users", user.uid);
  await setDoc(userDocRef, JSON.parse(JSON.stringify(user, replacer)));
};
