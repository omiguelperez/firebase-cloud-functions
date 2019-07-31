const admin = require('firebase-admin')

class Notifications {
  registerTokenToTopic (token) {
    const registrationTokens = [token]

    return admin
      .messaging()
      .subscribeToTopic(registrationTokens, 'RecentPosts')
      .then(() => {
        return console.log(`Rightly added to topic`)
      })
      .catch(error => {
        console.error(`Error registering token => ${error}`)
      })
  }

  sendNotification (title, description, topic, type) {
    const sendTopic = topic === null ? 'RecentPosts' : topic

    const message = {
      data: {
        title: title,
        description: description,
        type: type    
      },
      topic: sendTopic
    }

    return admin
      .messaging()
      .send(message)
      .then(() => {
        return console.log(
          `Messenger successfull send RecentPosts`
        )
      })
      .catch(error => {
        console.error(
          `Error sending message to topic RecentPosts => ${error}`
        )
      })
  }

  sendNotificationToToken (title, description, type, token) {
    console.log("token")
    console.log(token)
    const message = {
      data: {
        title: title,
        description: description,
        type: type
      },
      token: token
    }

    return admin
      .messaging()
      .send(message)
      .then(() => {
        return console.log(`Message successfully to token`)
      })
      .catch(error => {
        console.error(`Error sending token => ${error}`)
      })
  }
}

exports.Notifications = Notifications