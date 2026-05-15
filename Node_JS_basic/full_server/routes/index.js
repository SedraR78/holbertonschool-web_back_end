// 1. Importer les 2 controllers
import AppController from '../controllers/AppController';
import StudentsController from '../controllers/StudentsController';

// 2. Fonction qui setup toutes les routes sur l'app Express
const setupRoutes = (app) => {
  // route / → AppController
  app.get('/', AppController.getHomepage);

  // route /students → liste de tous les students
  app.get('/students', StudentsController.getAllStudents);

  // route /students/:major → liste des students d'un major
  app.get('/students/:major', StudentsController.getAllStudentsByMajor);
};

// 3. Export
export default setupRoutes;
