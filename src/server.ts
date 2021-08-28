import express from 'express'
import path from 'path'
import morgan from 'morgan'
const server = express()
import { v4 as uuid } from 'uuid'
server.set('view engine', 'ejs')

const PORT = 7777

const createPath = (page: string) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`)

server.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

server.use(express.urlencoded({ extended: false }))

server.use(express.static('src/styles'))

server.get('/', (req, res) => {
    const title = 'Home'
    res.render(createPath('index'), { title })
})

server.get('/contacts', (req, res) => {
    const title = 'Contacts'

    const contacts = [
        { service: 'Youtube', link: 'http://youtube.com/YauhenKavalchuk' },
        { service: 'Twitter', link: 'https://twitter.com/andygrini' },
        { service: 'Github', link: 'https://github.com/andygr1n1' },
    ]
    res.render(createPath('contacts'), { contacts, title })
})

server.get('/posts', (req, res) => {
    const title = 'Posts'
    const posts = [
        {
            id: 1,
            text: 'Lorem Ipsum post 1',
            title: 'Post Title',
            date: '28.08.2021',
            author: 'Andrew Grini',
        },
        {
            id: 2,
            text: 'Lorem Ipsum post 2',
            title: 'Terror Post',
            date: '28.08.2021',
            author: 'Ahmed Baliev',
        },
        {
            id: 3,
            text: 'Lorem Ipsum post 3',
            title: 'Music Post',
            date: '28.08.2021',
            author: 'Maugli rockernroll',
        },
    ]
    res.render(createPath('posts'), { title, posts })
})

server.get('/posts/:id', (req, res) => {
    const title = 'Post'
    const post = {
        id: 1,
        text: 'Lorem Ipsum post 1',
        title: 'Post Title',
        date: '28.08.2021',
        author: 'Andrew Grini',
    }
    res.render(createPath('post'), { title, post })
})

server.get('/add-post', (req, res) => {
    const title = 'Add post'
    res.render(createPath('add-post'), { title })
})

server.get('/about-us', (req, res) => {
    res.redirect('/contacts')
})

server.post('/add-post', (req, res) => {
    const { title, author, text } = req.body
    const post = {
        id: uuid(),
        title,
        author,
        text,
        date: new Date().toLocaleDateString(),
    }

    res.render(createPath('post'), { post, title })
})

server.use((req, res) => {
    const title = 'Error!'
    res.status(404).render(createPath('error'), { title })
})

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

// send | sendFile
