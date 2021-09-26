/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Post } from '../models/post'

const handleError = (res: any, err: any) => {
    res.status(500).send(err)
}

export const getOnePost = (req: any, res: any) => {
    const id = req.params.id

    Post.findById(id)
        .then((post) => {
            res.status(200).json(post)
        })
        .catch((err) => {
            handleError(res, err)
        })
}

export const deletePost = (req: any, res: any) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json(req.params.id)
        })
        .catch((err) => {
            handleError(res, err)
        })
}

export const editPost = (req: any, res: any) => {
    const { title, author, text } = req.body
    const id = req.params.id

    Post.findByIdAndUpdate(id, { title, author, text }, { new: true })
        .then(() => {
            res.status(200).json(req.params.id)
        })
        .catch((err) => {
            handleError(res, err)
        })
}

export const getAllPosts = (_req: any, res: any) => {
    Post.find()
        .sort({ createdAt: -1 })
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((err) => {
            handleError(res, err)
        })
}

export const addPost = (req: any, res: any) => {
    const { title, author, text } = req.body
    const post = new Post({ title, author, text })
    post.save()
        // .then((mongoPost) => res.send(mongoPost))
        .then(() => {
            res.status(200).json(post)
        })
        .catch((err) => {
            handleError(res, err)
        })
}
