import http from 'http'
import fs from 'fs'
import path from 'path'

const server = http.createServer((req, res) => {
    console.log('Server request')
    console.log('req.url', req.url)

    res.setHeader('Content-type', 'text/html')

    const createPath = (page: string) => path.resolve(__dirname, 'views', `${page}.html`)

    // let basePath = ' '

    const routes = new Map([
        ['/', createPath('index')],
        ['/home', createPath('index')],
        ['/index', createPath('index')],
        ['/contacts', createPath('contacts')],
        ['/error', createPath('error')],
    ])

    // switch (req.url) {
    //     case '/':
    //     case '/home':
    //     case '/index':
    //         basePath = createPath('index')
    //         res.statusCode = 200
    //         break
    //     case '/about-us':
    //         res.statusCode = 301
    //         // basePath = createPath('contacts')
    //         res.setHeader('Location', '/contacts')
    //         res.end()
    //         break
    //     case '/contacts':
    //         basePath = createPath('contacts')
    //         res.statusCode = 200
    //         break
    //     default:
    //         basePath = createPath('error')
    //         res.statusCode = 404
    //         break
    // }
    // console.log('basePath', basePath)

    fs.readFile(routes.get(req.url?.toString() || '/error') || '', (err, data) => {
        if (err) {
            console.log(err)
            res.statusCode = 500
            res.end()
        } else {
            res.write(data)
            res.end()
        }
    })
})

const PORT = 4444

server.listen(4444, () => {
    console.log(`listening on port ${PORT}`)
})
