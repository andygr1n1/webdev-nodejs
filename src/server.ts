import express from 'express'
import path from 'path'
import morgan from 'morgan'
import mongoose, { mongo } from 'mongoose'
import { Post } from './models/post'
import { Contact } from './models/contact'
import { v4 as uuid } from 'uuid'
import methodOverride from 'method-override'

const server = express()
const db =
    'mongodb+srv://andy_grini:Zxc123569013@cluster0.ch1cm.mongodb.net/db_nodets_webdev?retryWrites=true&w=majority'

mongoose
    .connect(db)
    .then(() => console.log('connected to db'))
    .catch((err) => console.log('err:::', err))

server.set('view engine', 'ejs')

const PORT = 7777

const createPath = (page: string) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`)

server.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

server.use(express.urlencoded({ extended: false }))

server.use(express.static('src/styles'))

server.use(methodOverride('_method'))

server.get('/', (req, res) => {
    const title = 'Home'
    res.render(createPath('index'), { title })
})

server.get('/contacts', (req, res) => {
    const title = 'Contacts'

    // const contacts = [
    //     { service: 'Youtube', link: 'http://youtube.com/YauhenKavalchuk' },
    //     { service: 'Twitter', link: 'https://twitter.com/andygrini' },
    //     { service: 'Github', link: 'https://github.com/andygr1n1' },
    // ]
    Contact.find()
        .then((contacts) => {
            console.log(contacts)
            res.render(createPath('contacts'), { contacts, title })
        })
        .catch((err) => {
            res.render(createPath('error'), { title: 'error' })
            console.log('contacts err:::', err)
        })
})

server.get('/posts', (req, res) => {
    const title = 'Posts'
    // const posts = [
    //     {
    //         id: 1,
    //         text: 'Lorem Ipsum post 1',
    //         title: 'Post Title',
    //         date: '28.08.2021',
    //         author: 'Andrew Grini',
    //     },
    //     {
    //         id: 2,
    //         text: 'Lorem Ipsum post 2',
    //         title: 'Terror Post',
    //         date: '28.08.2021',
    //         author: 'Ahmed Baliev',
    //     },
    //     {
    //         id: 3,
    //         text: 'Lorem Ipsum post 3',
    //         title: 'Music Post',
    //         date: '28.08.2021',
    //         author: 'Maugli rockernroll',
    //     },
    // ]
    Post.find()
        .sort({ createdAt: -1 })
        .then((posts) => {
            console.log('posts:::', posts)
            res.render(createPath('posts'), { title, posts })
        })
        .catch((err) => {
            res.render(createPath('error'), { title: 'error' })
            console.log('error:::', err)
        })
})

server.get('/posts/:id', (req, res) => {
    const title = 'Post'
    const id = req.params.id
    // const post = {
    //     id: 1,
    //     text: 'Lorem Ipsum post 1',
    //     title: 'Post Title',
    //     date: '28.08.2021',
    //     author: 'Andrew Grini',
    // }
    Post.findById(id)
        .then((post) => res.render(createPath('post'), { title, post, id }))
        .catch((err) => {
            res.render(createPath('error'), { title: 'error' })
            console.log('error:::', err)
        })
})

server.get('/add-post', (req, res) => {
    const title = 'Add post'
    res.render(createPath('add-post'), { title })
})

server.get('/about-us', (req, res) => {
    res.redirect('/contacts')
})

server.get('/edit/:id', (req, res) => {
    const title = 'Edit Post'
    const id = req.params.id

    Post.findById(id)
        .then((post) => res.render(createPath('edit-post'), { title, post, id }))
        .catch((err) => {
            res.render(createPath('error'), { title: 'error' })
            console.log('error:::', err)
        })
})

server.post('/add-post', (req, res) => {
    const { title, author, text } = req.body
    const post = new Post({ title, author, text })
    post.save()
        // .then((mongoPost) => res.send(mongoPost))
        .then(() => res.redirect('/posts'))
        .catch((e) => {
            res.render(createPath('error'), { title: 'error' })
            console.log('error:::', e)
        })
})

server.delete('/posts/:id', (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.sendStatus(200))
        .catch((err) => {
            res.render(createPath('error'), { title: 'error' })
            console.log('error:::', err)
        })
})

server.put('/edit/:id', (req, res) => {
    const { title, author, text } = req.body
    const id = req.params.id

    Post.findByIdAndUpdate(id, { title, author, text })
        .then(() => res.redirect(`/posts/${id}`))
        .catch((err) => {
            res.render(createPath('error'), { title: 'error' })
            console.log('error:::', err)
        })
})

server.use((req, res) => {
    const title = 'Error!'
    res.status(404).render(createPath('error'), { title })
})

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

// send | sendFile
