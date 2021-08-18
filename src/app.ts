import http from 'http'

const server = http.createServer((req, res) => {
    console.log('Server request', req)
    console.log('req.url', req.url)
    console.log('req.method', req.method)

    res.setHeader('Content-type', 'application/json')
    // res.setHeader('Content-type', 'text/html')
    // res.write('<head><link rel="stylesheet" href="#"/></head>')
    // res.write('<h1>Hey hello!</h1>')
    // res.write('<h2>my name is Andy</h2>')

    const data = JSON.stringify([
        { name: 'Andy', age: 31 },
        { name: 'Alice', age: 21 },
    ])

    res.end(data)
})

const PORT = 4444

server.listen(4444, () => {
    console.log(`listening on port ${PORT}`)
})
