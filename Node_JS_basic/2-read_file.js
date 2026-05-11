const fs = require('fs');
function countStudents(path) {
  try {
    // 1. Lire le fichier (sync)
    const data = fs.readFileSync(path, 'utf8');

    // 2. Split + filter pour virer les lignes vides
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    // 3. Séparer l'en-tête du reste
    const students = lines.slice(1);

    // 4. console.log du total d'étudiants
    console.log(`Number of students: ${students.length}`);

    // 5. Grouper les prénoms par champ dans un objet { CS: [...], SWE: [...] }
    const byField = {}; // création d'un objet vide
    students.forEach((line) => {           // pour chaque étudiant du tableau (line = 'Johann,Kerbrou,30,CS' au 1er tour)
    const [firstname, , , field] = line.split(',');   // découpe la ligne sur les virgules → ['Johann','Kerbrou','30','CS'], puis prend l'index 0 (firstname) et l'index 3 (field), skip les 2 du milieu
    if (!byField[field]) {               // si la clé du champ (ex: byField.CS) n'existe pas encore dans l'objet
        byField[field] = [];               // on l'initialise avec un tableau vide pour pouvoir push dedans après
    }
    byField[field].push(firstname);      // on ajoute le prénom à la fin du tableau du bon champ
    });                                    // fin du forEach, on passe à l'étudiant suivant

    // 6. Trier les noms de champs alphabétiquement
    const fields = Object.keys(byField).sort(); // tableau des clés ['CS','SWE'] trié

    // 7. Pour chaque champ trié, console.log le format demandé
    fields.forEach((field) => {
      const names = byField[field]; // tableau des prénoms du champ
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    });
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}
module.exports = countStudents;
