import Post from "../model/post.js"

export const createPost = async (req, res) => {
    try {

        const { title, description, picture, username, categories } = req.body;
        const post = await Post.create({
            title, description, picture, username, categories
        })
        return res.status(200).json({
            success: true,
            msg: "post saved successfully"
        })
    } catch (error) {
        console.error("Create post error:", error);
        return res.status(500).json({
            success: false,
            msg: error.message || "Failed to create post"
        })
    }
}

export const getAllPosts = async (req, res) => {
    const category = req.query.category
    let posts;
    try {
        if (category) {
            posts = await Post.find({ categories: category }).sort({createdAt: -1})
        } else {

            posts = await Post.find({}).sort({createdAt:-1})
        }
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

export const getPost = async (req, res) => {
    try {
        const data = await Post.findById(req.params.id);
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ msg: "Post not Found" })
        }
        await Post.findByIdAndUpdate(req.params.id, { $set: req.body })
        return res.status(200).json({ msg: "Post Updated SuccessFully" })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ msg: "Post not Found" })
        }
        await Post.findByIdAndDelete(req.params.id);

        return res.status(200).json({ msg: "Post Deleted SuccessFully" })

    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}