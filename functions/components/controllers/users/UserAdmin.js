const { Email } = require('../utils/EmailHelper.js')
const { HubSpotHelper } = require('../utils/HubSpotHelper.js')
const {
  welcomeEmailTemplate,
  farewellEmailTemplate,
} = require('../utils/EmailTemplates.js')
const admin = require('firebase-admin')

class UserAdmin {
  registerUserEmails (name, email) {
    console.log('New email registered')
    return admin
      .firestore()
      .collection('useremails')
      .add({ name, email })
  }

  sendWelcomeEmail (name, email) {
    const to = email
    const from = 'info@blogeek.com'

    const textHtml = welcomeEmailTemplate(name)

    const objEmail = new Email()

    return objEmail.sendEmail(
      from,
      to,
      '',
      'Video Blogeek - Bienvenido a la Comunidad de Videos Geek',
      textHtml
    )
  }

  sendFarewellEmail (name, email) {
    const to = email
    const from = 'info@blogeek.com'

    const textHtml = farewellEmailTemplate(name)

    const objEmail = new Email()

    return objEmail.sendEmail(
      from,
      to,
      '',
      'Video Blogeek - Espera!! no te vayas de la Comunidad de Videos Geek',
      textHtml
    )
  }

  syncCRM (name, lastName, email) {
    const hubSpot = new HubSpotHelper()
    return hubSpot.createUser(name, lastName, email)
  }
}

exports.UserAdmin = UserAdmin