import React, { useState, useEffect } from "react";

import { firestore } from "../firebase";
import Authentication from "./Authentication";
import Posts from "./Posts";
import { collectIdsAndDocs } from "../utilities";

const Application = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

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
      <Authentication user={user} />
      <Posts posts={posts} />
    </main>
  );
};
export default Application;
