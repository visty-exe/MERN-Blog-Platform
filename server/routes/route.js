import express from "express"
import { signupUser,loginUser } from "../controller/user-controller.js"  
import {uploadImage,getImage} from "../controller/image-controller.js"
import { createPost,getAllPosts,getPost,updatePost,deletePost} from "../controller/post-controller.js"
import {upload} from '../utils/upload.js'
import { authenticateToken } from "../controller/jwt-controller.js"
import { profileController } from "../controller/profile-controller.js"
import {newComment,getComments,deleteComment} from "../controller/comment-controller.js"
const router = express.Router()

router.post("/signup",signupUser)
router.post("/login",loginUser)
router.post("/file/upload",upload.single('file'),uploadImage)
router.get("/file/:filename",getImage)
router.post('/create',authenticateToken,createPost)
router.get('/posts',authenticateToken,getAllPosts)
router.get('/post/:id',authenticateToken,getPost)
router.put('/update/:id',authenticateToken,updatePost)
router.delete('/delete/:id',authenticateToken,deletePost)
router.post('/addComment/new',authenticateToken,newComment)
router.get('/comments',authenticateToken,getComments)
router.delete('/deletecomment/:id',authenticateToken,deleteComment)
router.get('/profile/:id',authenticateToken,profileController)


export default router