// 1. Importer express et les routes
import express from 'express';
import setupRoutes from './routes/index';

// 2. Créer l'app
const app = express();

// 3. Port demandé par le sujet
const port = 1245;

// 4. Brancher les routes
setupRoutes(app);

// 5. Lancer le serveur
app.listen(port);

// 6. Export OBLIGATOIRE pour les tests (mentionné dans le warning du sujet)
export default app;
