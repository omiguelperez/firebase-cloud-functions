const { UserAdmin } = require('./UserAdmin')

exports.creation = function (user) {
  const userAdmin = new UserAdmin()

  return userAdmin.sendWelcomeEmail(user.displayName, user.email)
    .then(() => {
      return userAdmin.registerUserEmails(user.displayName, user.email)
    })
    .catch(err => console.error(`Error creating user: ${err}`))
}

exports.remove = function (user) {
  const userAdmin = new UserAdmin()

  return userAdmin.sendFarewellEmail(user.displayName, user.email)
    .catch(err => console.error(`Error deleting user: ${err}`))
}

exports.createUserCRM = function (user) {
  const userAdmin = new UserAdmin()

  return userAdmin.syncCRM(user.displayName, user.displayName, user.email)
    .catch(err => console.error(`Error syncing user ${err}`))
}
