// 1. Importer fs pour lire le fichier
import fs from 'fs';

// 2. Définir la fonction qui prend un path
function readDatabase(path) {
  // 3. Retourner une Promise (lecture asynchrone)
  return new Promise((resolve, reject) => {
    // 4. Lire le fichier async
    fs.readFile(path, 'utf-8', (err, data) => {
      // 5. Si erreur → reject
      if (err) {
        reject(err);
        return;
      }

      // 6. Parser le CSV
      const byField = {};
      const lines = data
        .split('\n')
        .filter((line) => line.trim() !== '') // retire les lignes vides
        .slice(1); // retire le header

      // pour chaque ligne, extraire firstname + field
      lines.forEach((line) => {
        const [firstname, , , field] = line.split(',');
        if (!byField[field]) byField[field] = [];
        byField[field].push(firstname);
      });

      // 7. resolve avec {CS: [...], SWE: [...]}
      resolve(byField);
    });
  });
}

// 8. Export ES6 (Babel-node)
export default readDatabase;