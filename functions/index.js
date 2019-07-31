const functions = require('firebase-functions');
const admin = require('firebase-admin')

const userController = require('./components/controllers/users/UserController')

admin.initializeApp()
admin.firestore().settings({ timestampsInSnapshots: true })

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.userCreation = functions.auth
  .user()
  .onCreate(userController.creation)

exports.removeUser = functions.auth
  .user()
  .onCreate(userController.remove)

exports.userCreationCRM = functions.auth
  .user()
  .onCreate(userController.createUserCRM)
