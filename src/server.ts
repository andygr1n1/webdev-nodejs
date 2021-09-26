import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import methodOverride from 'method-override'
import { createPath } from './helpers/create_path'
import { contactsRouter } from './routes/contact-routes'
import { postRouter } from './routes/post-routes'
import { apiPostRouter } from './routes/api-post-routes';
const server = express()
const db =
    'mongodb+srv://andy_grini:Zxc123569013@cluster0.ch1cm.mongodb.net/db_nodets_webdev?retryWrites=true&w=majority'

mongoose
    .connect(db)
    .then(() => console.log('connected to db'))
    .catch((err) => console.log('err:::', err))

server.set('view engine', 'ejs')

const PORT = 7777

server.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

server.use(express.urlencoded({ extended: false }))

server.use(express.static('src/styles'))

server.use(methodOverride('_method'))

server.use(postRouter)
server.use(contactsRouter)
server.use(apiPostRouter)

server.get('/', (req, res) => {
    const title = 'Home'
    res.render(createPath('index'), { title })
})

server.use((req, res) => {
    const title = 'Error!'
    res.status(404).render(createPath('error'), { title })
})

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

// send | sendFile
