const http = require('http');

const app = http.createServer((_request, response) => {
  // this callback runs for EVERY incoming request
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.write('Hello Holberton School!');
  response.end(); // MUST call this to finish the response
});

app.listen(1245);

module.exports = app;
