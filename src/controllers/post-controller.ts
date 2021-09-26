/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Post } from '../models/post'
import { createPath } from '../helpers/create_path'
import { handleError } from '../helpers/handle_error'

export const getAllPosts = (_req: any, res: any) => {
    const title = 'Posts'
    Post.find()
        .sort({ createdAt: -1 })
        .then((posts) => {
            console.log('posts:::', posts)
            res.render(createPath('posts'), { title, posts })
        })
        .catch((err) => {
            handleError(res, err)
        })
}

export const getOnePost = (req: any, res: any) => {
    const title = 'Post'
    const id = req.params.id

    Post.findById(id)
        .then((post) => {
            res.render(createPath('post'), { title, post, id })
        })
        .catch((err) => {
            handleError(res, err)
        })
}

export const addPostPageRendering = (req: any, res: any) => {
    const title = 'Add post'
    res.render(createPath('add-post'), { title })
}

export const addPost = (req: any, res: any) => {
    const { title, author, text } = req.body
    const post = new Post({ title, author, text })
    post.save()
        // .then((mongoPost) => res.send(mongoPost))
        .then(() => {
            res.redirect('/posts')
        })
        .catch((err) => {
            handleError(res, err)
        })
}

export const editPostPageRendering = (req: any, res: any) => {
    const title = 'Edit Post'
    const id = req.params.id

    Post.findById(id)
        .then((post) => {
            res.render(createPath('edit-post'), { title, post, id })
        })
        .catch((err) => {
            handleError(res, err)
        })
}

export const editPost = (req: any, res: any) => {
    const { title, author, text } = req.body
    const id = req.params.id

    Post.findByIdAndUpdate(id, { title, author, text })
        .then(() => {
            res.redirect(`/posts/${id}`)
        })
        .catch((err) => {
            handleError(res, err)
        })
}

export const deletePost = (req: any, res: any) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => {
            res.sendStatus(200)
        })
        .catch((err) => {
            handleError(res, err)
        })
}
