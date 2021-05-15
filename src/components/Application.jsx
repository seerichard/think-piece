import React, { useState, useEffect } from "react";

import { firestore } from "../firebase";
import Posts from "./Posts";
import { collectIdsAndDocs } from "../utilities";

const Application = () => {
  const [posts, setPosts] = useState([]);

  const handleCreate = async (post) => {
    const documentReference = await firestore.collection("posts").add(post);
    const doc = await documentReference.get();

    const newPost = collectIdsAndDocs(doc);
    console.log(newPost);

    setPosts([newPost, ...posts]);
  };

  const handleRemove = async (id) => {
    // Using firestore shorthand
    // Remove from the database
    console.log("Id:", id);
    await firestore.doc(`posts/${id}`).delete();

    // Remove from state
    setPosts(posts.filter((post) => post.id !== id));
  };

  useEffect(() => {
    const getPosts = async () => {
      const snapshot = await firestore.collection("posts").get();

      const posts = snapshot.docs.map(collectIdsAndDocs);

      setPosts(posts);
    };

    getPosts();
  }, []);

  return (
    <main className="Application">
      <h1>Think Piece</h1>
      <Posts posts={posts} onCreate={handleCreate} onRemove={handleRemove} />
    </main>
  );
};
export default Application;
