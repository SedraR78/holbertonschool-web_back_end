const http = require('http');
const fs = require('fs');
const countStudents = require('./3-read_file_async');

const DATABASE = process.argv[2]; // récupérer la database depuis la CLI

// (optionnel) recréer countStudents adapté pour res au lieu de console.log
// ou la garder telle quelle et l'appeler avant d'envoyer la réponse

const app = http.createServer((req, res) => {
  // routing
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    // 1. envoyer la 1ère ligne "This is the list of our students"
    res.write('This is the list of our students\n');
    
    countStudents(DATABASE)
    .then(() => {
        
    })
        .catch((error) => {
        console.log(error);
    });
    // 2. lire le fichier async + parser + envoyer le détail
    // 3. res.end() à la fin
    res.end()
  }
});

app.listen(1245);

module.exports = app;