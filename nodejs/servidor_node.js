// const http = require('http');

// let server = http.createServer((require, response) => {
//     console.log('URL', require.url);
//     console.log('Method', require.method);

//     switch (require.url) {
//         case '/':
//             response.statusCode = 200;
//             response.setHeader('Content-Type', 'text/html');
//             response.end('<h1>Olá</h1>');
//             break;

//         case '/users':
//             response.statusCode = 200;
//             response.setHeader('Content-Type', 'application/json');
//             response.end(JSON.stringify({
//                 users: [{
//                     'name': 'Mateus Gabriel Barbosa',
//                     'email': 'devmateus@gmail.com',
//                     'id': 1
//                 }]
//             }));
//             break;
//     }
// });

// server.listen(80, '127.0.0.1', () => {
//     console.log('servidor iniciado');
// });

//UTILIZANDO O EXPRESS
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValdiator = require('express-validator');

let app = express();

app.use(bodyParser.urlencoded({
    extended: false,
    limit: '50mb'
}));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(expressValdiator());

consign().include('routes').include('utils').into(app);

app.listen(4000, '127.0.0.1', () => {
    console.log('servidor iniciado :D');
})