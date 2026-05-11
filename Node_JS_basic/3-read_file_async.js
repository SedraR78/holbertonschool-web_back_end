const fs = require('fs');

function countStudents(path) {
  // 1. Return a Promise that wraps all the async logic
  return new Promise((resolve, reject) => {
    // 2. Read the file ASYNCHRONOUSLY with fs.readFile (callback err, data)
    fs.readFile(path, 'utf8', (err, data) => {
      // 3. If read error → reject with new Error('Cannot load the database')
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }
      // 4. Otherwise (file read successfully):
        // 4.1. Split + filter to remove empty lines
        const lines = data.split('\n').filter((line) => line.trim() !== '');
        // 4.2. Separate the header from the rest with slice(1)
        const students = lines.slice(1);
        // 4.3. console.log the total number of students
        console.log(`Number of students: ${students.length}`);
        // 4.4. Group firstnames by field in an object { CS: [...], SWE: [...] }
        const byField = {}; // création d'un objet vide
        students.forEach((line) => {           // pour chaque étudiant du tableau (line = 'Johann,Kerbrou,30,CS' au 1er tour)
        const [firstname, , , field] = line.split(',');   // découpe la ligne sur les virgules → ['Johann','Kerbrou','30','CS'], puis prend l'index 0 (firstname) et l'index 3 (field), skip les 2 du milieu
        if (!byField[field]) {               // si la clé du champ (ex: byField.CS) n'existe pas encore dans l'objet
            byField[field] = [];               // on l'initialise avec un tableau vide pour pouvoir push dedans après
        }
        byField[field].push(firstname);      // on ajoute le prénom à la fin du tableau du bon champ
        });                                    // fin du forEach, on passe à l'étudiant suivant

        // 4.5. Sort field names alphabetically
        const fields = Object.keys(byField).sort(); 
        // 4.6. For each sorted field, console.log the required format
        fields.forEach((field) => {
          const names = byField[field];
          console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
        });
        // 4.7. resolve() to signal that the Promise completed successfully
        resolve();
    });
  });
}

module.exports = countStudents;