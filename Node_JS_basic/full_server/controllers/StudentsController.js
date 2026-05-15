// 1. Importer la fonction utils
import readDatabase from '../utils';

class StudentsController {
  // ----- /students -----
  static getAllStudents(request, response) {
    // 2. Récupérer le path de la DB depuis argv (à chaque appel, pas au top !)
    const databasePath = process.argv[2];

    // 3. Appeler readDatabase
    readDatabase(databasePath)
      .then((fields) => {
        // 4. Construire la réponse ligne par ligne
        const lines = ['This is the list of our students'];

        // 5. Trier les fields par ordre alphabétique CASE-INSENSITIVE
        const sortedFields = Object.keys(fields).sort(
          (a, b) => a.toLowerCase().localeCompare(b.toLowerCase()),
        );

        // 6. Pour chaque field, format EXACT demandé
        sortedFields.forEach((field) => {
          const list = fields[field];
          lines.push(
            `Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`,
          );
        });

        // 7. Envoyer le tout joint par \n
        response.status(200).send(lines.join('\n'));
      })
      .catch(() => {
        // 8. Si la DB charge pas → 500 + message exact
        response.status(500).send('Cannot load the database');
      });
  }

  // ----- /students/:major -----
  static getAllStudentsByMajor(request, response) {
    // 1. Récupérer le param :major dans l'URL
    const { major } = request.params;

    // 2. Vérifier qu'il est valide (CS ou SWE uniquement)
    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    // 3. Path de la DB depuis argv
    const databasePath = process.argv[2];

    // 4. Appeler readDatabase
    readDatabase(databasePath)
      .then((fields) => {
        // 5. Récupérer la liste pour ce major (sinon tableau vide)
        const list = fields[major] || [];

        // 6. Format EXACT : "List: firstname1, firstname2, ..."
        response.status(200).send(`List: ${list.join(', ')}`);
      })
      .catch(() => {
        // 7. DB pas dispo → 500
        response.status(500).send('Cannot load the database');
      });
  }
}

export default StudentsController;