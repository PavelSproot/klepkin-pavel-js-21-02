const express = require('express')
const app = express()
const fs = require('fs')

const host = '127.0.0.1';
const port = 3000;
const fname = 'zfile';

const readFile = (filename) => {
    if (fs.existsSync(filename)) {
        try {
            return fs.readFileSync(filename, 'utf8')
        } catch {
            return '';
        }
    } else {
        return '';
    }
}

const writeFile = (filename, text) => {
    try {
        fs.writeFileSync(filename, text, 'utf8');
    } catch (e) {
        console.error(e)
    }
}

app.use(express.json())
app.use((req, res, next) => {
    res.type('text/plain')
        .set(
            'Access-Control-Allow-Origin',
            '*'
        )
        .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
        .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.route('/zfile')
    .get((req, res) => {
        res
            .status(200)
            .json(readFile(fname))
    })
    .post((req, res) => {
        writeFile(fname, req.body.textval);
        res
            .status(200)
            .json(readFile(fname))
    })

app.listen(port, host, () => console.log(`Server started at http://${host}:${port}`))
