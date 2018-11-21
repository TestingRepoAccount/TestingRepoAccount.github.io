const http = require('http');
const app = require('./app');

const port = 1010;

http.createServer(app).listen(port, () => console.log(`Listing on port : ${port}`));