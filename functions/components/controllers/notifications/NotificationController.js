  	const { Notifications } = require('./Notifications')

exports.createToken = dataSnapshot => {
  const notifications = new Notifications()

  return notifications.registerTokenToTopic(dataSnapshot.data().token)
}