const functions = require('firebase-functions');
const admin = require('firebase-admin')

const userController = require('./components/controllers/users/UserController')
const postsController = require('./components/controllers/posts/PostsController')
const notificationController = require('./components/controllers/notifications/NotificationController')

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

exports.registerTopic = functions.firestore
  .document('tokens/{id}')
  .onCreate(notificationController.createToken)

exports.sendNotification = functions.firestore
  .document('posts/{postId}')
  .onUpdate(postsController.updatePost)