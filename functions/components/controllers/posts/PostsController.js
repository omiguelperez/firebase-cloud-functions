const { Notifications } = require('../notifications/Notifications')
const { Posts } = require('./Posts')

exports.updatePost = function (dataSnapshot, context) {
  const notifications = new Notifications()
  
  if (dataSnapshot.before.data().publicated === false &&
    dataSnapshot.after.data().publicated === true) {
      return notifications.sendNotification(
        dataSnapshot.after.data().title,
        dataSnapshot.after.data().description,
        null,
        ''
      )
    }
}