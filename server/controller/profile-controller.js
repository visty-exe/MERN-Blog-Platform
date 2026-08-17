import Post from "../model/post.js";

export const profileController = async (req, res) => {
  try {
    const posts = await Post.find({
      userId: req.params.id,
    }).sort({ createdAt: -1 });

    if (!posts || posts.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "No posts found",
      });
    }

    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error("Profile error:", error);

    return res.status(500).json({
      success: false,
      msg: "Unable to fetch posts",
    });
  }
};