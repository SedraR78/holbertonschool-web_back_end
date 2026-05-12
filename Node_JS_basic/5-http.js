const http = require('http');
const fs = require('fs');
const DATABASE = process.argv[2]; // récupérer la database depuis la CLI

const app = http.createServer((req, res) => {
  // routing
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    // 1. envoyer la 1ère ligne "This is the list of our students"
    res.write('This is the list of our students\n');

    // 2. Read the file ASYNCHRONOUSLY with fs.readFile (callback err, data)
    fs.readFile(DATABASE, 'utf8', (err, data) => {
      // 3. If read error → send error message in the response
      if (err) {
        res.end('Cannot load the database');
        return; // important: stop here, don't execute the rest
      }
      // 4. Otherwise (file read successfully):
      // 4.1. Split + filter to remove empty lines
      const lines = data.split('\n').filter((line) => line.trim() !== '');
      // 4.2. Separate the header from the rest with slice(1)
      const students = lines.slice(1);
      // 4.3. send the total number of students
      res.write(`Number of students: ${students.length}`);
      // 4.4. Group firstnames by field in an object { CS: [...], SWE: [...] }
      const byField = {};
      students.forEach((line) => {
        const [firstname, , , field] = line.split(',');
        if (!byField[field]) {
          byField[field] = [];
        }
        byField[field].push(firstname);
      });
      // 4.5. Sort field names alphabetically
      const fields = Object.keys(byField).sort();
      // 4.6. For each sorted field, send the required format
      fields.forEach((field) => {
        const names = byField[field];
        res.write(`\nNumber of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
      });
      // 4.7. end the response (replaces resolve())
      res.end();
    });
  }
});

app.listen(1245);
module.exports = app;
