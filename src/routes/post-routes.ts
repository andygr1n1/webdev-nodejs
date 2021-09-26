import express from 'express'
import {
    deletePost,
    addPost,
    addPostPageRendering,
    editPost,
    editPostPageRendering,
    getAllPosts,
    getOnePost,
} from '../controllers/post-controller'

export const postRouter = express.Router()

postRouter.get('/posts', getAllPosts)

postRouter.get('/posts/:id', getOnePost)

postRouter.get('/add-post', addPostPageRendering)

postRouter.post('/add-post', addPost)

postRouter.get('/edit/:id', editPostPageRendering)

postRouter.put('/edit/:id', editPost)

postRouter.delete('/posts/:id', deletePost)
