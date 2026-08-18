import React, { useEffect, useState } from "react";
import { getAccessToken } from "../../utils/common-utils";
import { useParams, Link } from "react-router-dom";
import { Edit, Eye } from "lucide-react";

const MyPosts = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

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
          setPosts(data.posts || []);
        } else {
          console.log(data.msg);
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPosts();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <p className="text-gray-500 text-lg">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen px-4 py-8 md:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              MY POSTS
            </h1>

            <p className="text-gray-500 mt-1">
              {posts.length}{" "}
              {posts.length === 1 ? "post" : "posts"} published
            </p>
          </div>

          <Link
            to="/create"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg
                       hover:bg-blue-700 transition"
          >
            + Create Post
          </Link>
        </div>

        {/* No Posts */}
        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700">
              No posts yet
            </h2>

            <p className="text-gray-500 mt-2 mb-5">
              You haven't published any posts.
            </p>

            <Link
              to="/create"
              className="inline-block bg-blue-600 text-white px-5 py-2.5
                         rounded-lg hover:bg-blue-700 transition"
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          /* Posts */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm
                           hover:shadow-lg transition duration-300
                           flex flex-col"
              >

                {/* Image */}
                <div className="h-52 overflow-hidden">
                  <img
                    src={
                      post.picture ||
                      "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b"
                    }
                    alt={post.title}
                    className="w-full h-full object-cover
                               hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">

                  {/* Category */}
                  <span
                    className="w-fit text-xs font-semibold
                               bg-blue-100 text-blue-600
                               px-3 py-1 rounded-full mb-3"
                  >
                    {post.categories}
                  </span>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-500 mt-2 text-sm line-clamp-3">
                    {post.description}
                  </p>

                  {/* Date */}
                  <p className="text-xs text-gray-400 mt-4">
                    {post.createdAt &&
                      new Date(post.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                  </p>

                  {/* Buttons */}
                  <div className="flex items-center gap-2 mt-auto pt-5">

                    {/* View */}
                    <Link
                      to={`/details/${post._id}`}
                      className="flex-1 flex items-center justify-center
                                 gap-2 border border-gray-300
                                 py-2 rounded-lg text-sm
                                 hover:bg-gray-100 transition"
                    >
                      <Eye size={16} />
                      View
                    </Link>

                    {/* Edit */}
                    <Link
                      to={`/update/${post._id}`}
                      className="flex items-center justify-center
                                 gap-2 bg-blue-600 text-white
                                 px-4 py-2 rounded-lg text-sm
                                 hover:bg-blue-700 transition"
                    >
                      <Edit size={16} />
                      Edit
                    </Link>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPosts;