const express = require('express');
const app = express();
const fs = require('fs');
const DATABASE = process.argv[2];

app.get('/',(_req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Hello Holberton School!');
});
app.get('/students', (_req, res) => {
    let output = 'This is the list of our students\n' ;
    fs.readFile(DATABASE, 'utf8', (err, data) => {
        if (err) {
        output += 'Cannot load the database'; 
        res.send('output');
        return; 
      }
      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const students = lines.slice(1)
      output += `Number of students: ${students.length}`; 
      const byField = {};
      students.forEach((line) => {
        const [firstname, , , field] = line.split(',');
        if (!byField[field]) {
          byField[field] = [];
        }
        byField[field].push(firstname);
      });
      const fields = Object.keys(byField).sort();
      fields.forEach((field) => {
        const names = byField[field];
        output += `\nNumber of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
      });
      res.send(output);
   }); 
  });

app.listen(1245);
module.exports = app;
