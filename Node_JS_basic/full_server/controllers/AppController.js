// Controller pour la route /
class AppController {
  // méthode statique → pas besoin d'instancier la classe
  static getHomepage(request, response) {
    // status 200 + message demandé
    response.status(200).send('Hello Holberton School!');
  }
}

export default AppController;