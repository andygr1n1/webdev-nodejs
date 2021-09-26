import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import methodOverride from 'method-override'
import { createPath } from './helpers/create_path'
import { contactsRouter } from './routes/contact-routes'
import { postRouter } from './routes/post-routes'
import { apiPostRouter } from './routes/api-post-routes'
import dotenv from 'dotenv'

import chalk from 'chalk'
const errorMsg = chalk.bgKeyword('white').redBright
const sussessMsg = chalk.bgKeyword('green').white

dotenv.config()
const server = express()

const db: string = process.env.MONGO_URL || ''
const port = process.env.PORT || 7654

mongoose
    .connect(db)
    .then(() => console.log(sussessMsg('Successfully connected to db')))
    .catch((err) => console.log(errorMsg('err:::', err)))

server.set('view engine', 'ejs')

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

server.listen(port, () => {
    console.log(sussessMsg(`listening on port ${port}`))
})

// send | sendFile
