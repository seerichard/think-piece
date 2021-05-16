import React, { useState } from "react";
import { firestore, auth } from "../firebase";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const { uid, displayName, email, photoURL } = auth.currentUser || {};

    const post = {
      title,
      content,
      user: {
        uid,
        displayName,
        email,
        photoURL,
      },
      favorites: 0,
      comments: 0,
      createdAt: new Date(),
    };

    firestore.collection("posts").add(post);

    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="AddPost">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        type="text"
        name="content"
        placeholder="Body"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      <input className="create" type="submit" value="Create Post" />
    </form>
  );
};

export default AddPost;
