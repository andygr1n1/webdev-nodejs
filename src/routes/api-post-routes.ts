import express from 'express'
import { deletePost, addPost, editPost, getAllPosts, getOnePost } from '../controllers/api-post-controller'

export const apiPostRouter = express.Router()
// api
apiPostRouter.get('/api/posts', getAllPosts)
apiPostRouter.get('/api/posts/:id', getOnePost)
apiPostRouter.post('/api/add-post', addPost)
apiPostRouter.delete('/api/posts/:id', deletePost)
apiPostRouter.put('/api/edit/:id', editPost)
