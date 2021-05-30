const http = require('http');

const reqListener = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Powered-By', 'NodeJS');

    const {url, method} = req;

    if(url === '/') {

        if(method === 'GET') {
            res.statusCode = 200;
            res.end(JSON.stringify({
                message: `Ini adalah homepage`,
            }));
        } else {
            res.statusCode = 400;
            res.end(JSON.stringify({
                message: `<h1>Halaman tidak dapat diakses dengan ${method} req</h1>`,
            }));
        }      

    } else if(url === '/about') {

        if(method === 'GET') {
            res.statusCode = 200;
            res.end(JSON.stringify({
                message: `Halo! ini adalah halamat about`,
            }));
        } else if(method === 'POST') {
            let body = [];
    
            req.on('data', (chunk) => {
                body.push(chunk);
            });
    
            req.on('end', () => {
                body = Buffer.concat(body).toString();
                const {name} = JSON.parse(body);
                res.statusCode = 200;
                res.end(JSON.stringify({
                    message: `Halo, ${name}! Ini adalah halaman about`,
                }));
            });
        } else {
            res.statusCode = 400;
            res.end(JSON.stringify({
                message: `Halaman tidak dapat diakses menggunakan ${method} request`,
            }));
        }

    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({
            message: `Halaman tidak ditemukan!`,
        }));
    }
};

// const reqListener = (req, res) => {
//     res.end('<html><body><h1>Hello, World!</h1></body></html>');
// };

const server = http.createServer(reqListener);

const port = 5000;
const host = 'localhost';


server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});