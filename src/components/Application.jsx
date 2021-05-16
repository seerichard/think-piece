import React, { useState, useEffect } from "react";

import { firestore, auth, createUserProfileDocument } from "../firebase";
import Authentication from "./Authentication";
import Posts from "./Posts";
import { collectIdsAndDocs } from "../utilities";

const Application = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeFromFirestore = firestore
      .collection("posts")
      .onSnapshot((snapshot) => {
        const posts = snapshot.docs.map(collectIdsAndDocs);
        setPosts(posts);
      });

    return unsubscribeFromFirestore;
  }, []);

  useEffect(() => {
    // Will trigger when user goes from logged in -> logged out and vice versa
    // Will get user object if logged in, null if logged out
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      const user = await createUserProfileDocument(userAuth);

      setUser(user);
    });

    return unsubscribeFromAuth;
  }, []);

  return (
    <main className="Application">
      <h1>Think Piece</h1>
      <Authentication user={user} />
      <Posts posts={posts} />
    </main>
  );
};
export default Application;
