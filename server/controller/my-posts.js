import Post from "../model/post.js";

export const showMyPosts = async (req, res) => {
    try {
        console.log("Profile ID:", req.params.id);

        const posts = await Post.find({
            userId: req.params.id,
        }).sort({ createdAt: -1 });

        console.log("Posts:", posts);

        if (posts.length === 0) {
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