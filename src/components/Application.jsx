import React, { useState, useEffect } from "react";

import { firestore } from "../firebase";
import Posts from "./Posts";
import { collectIdsAndDocs } from "../utilities";

const Application = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore.collection("posts").onSnapshot((snapshot) => {
      const posts = snapshot.docs.map(collectIdsAndDocs);
      setPosts(posts);
    });

    return unsubscribe;
  }, []);

  return (
    <main className="Application">
      <h1>Think Piece</h1>
      <Posts posts={posts} />
    </main>
  );
};
export default Application;
