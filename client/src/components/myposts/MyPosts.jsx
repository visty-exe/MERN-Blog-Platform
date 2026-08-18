import React, { useEffect, useState } from "react";
import { getAccessToken } from "../../utils/common-utils";
import { useParams } from "react-router-dom";

const MyPosts = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [posts, setPosts] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/myposts/${id}`, {
          method: "GET",
          headers: {
            Authorization: getAccessToken(),
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        console.log("Response:", data);

        if (res.ok) {
          setPosts(data.posts);
        } else {
          console.log(data.msg);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (id) {
      fetchPosts();
    }
  }, [id]);

  return (
    <div>
      <h2>My Posts</h2>

      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;