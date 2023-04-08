import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase for SSR
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };

/* 
FIREBASE RULE

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{restOfPath=**} {
      allow read, write: if request.auth != null && userId == request.auth.uid;
    }
    match /posts/{postId} {
    	allow read;
      allow write: if request.resource.data.creatorId == request.auth.uid;
      allow delete: if request.auth.uid == resource.data.creatorId;
      allow update;
    }
    match /comments/{commentId} {
    	allow read;
      allow write: if request.resource.data.creatorId == request.auth.uid;
      allow delete: if request.auth.uid == resource.data.creatorId;
      allow update;
    }
    match /communities/{communityId} {
    	allow read;
      allow write: if request.auth != null;
    }
  }
}
*/
