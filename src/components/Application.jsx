import React, { useState } from "react";

import { firestore } from "../firebase";

import Posts from "./Posts";

const initialPosts = [
  {
    id: "1",
    title: "A Very Hot Take",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis suscipit repellendus modi unde cumque, fugit in ad necessitatibus eos sed quasi et! Commodi repudiandae tempora ipsum fugiat. Quam, officia excepturi!",
    user: {
      uid: "123",
      displayName: "Bill Murray",
      email: "billmurray@mailinator.com",
      photoURL: "https://www.fillmurray.com/300/300",
    },
    stars: 1,
    comments: 47,
  },
  {
    id: "2",
    title: "The Sauciest of Opinions",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis suscipit repellendus modi unde cumque, fugit in ad necessitatibus eos sed quasi et! Commodi repudiandae tempora ipsum fugiat. Quam, officia excepturi!",
    user: {
      uid: "456",
      displayName: "Mill Burray",
      email: "notbillmurray@mailinator.com",
      photoURL: "https://www.fillmurray.com/400/400",
    },
    stars: 3,
    comments: 0,
  },
];

const Application = () => {
  const [posts, setPosts] = useState(initialPosts);

  const handleCreate = (post) => {
    console.log("Inside:", post);
    setPosts([post, ...posts]);
  };

  return (
    <main className="Application">
      <h1>Think Piece</h1>
      <Posts posts={posts} onCreate={handleCreate} />
    </main>
  );
};
export default Application;
