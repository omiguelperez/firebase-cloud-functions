const admin = require('firebase-admin')
const functions = require('firebase-functions')
const path = require('path')
const os = require('os')
const fs = require('fs')
//const vision = require('@google-cloud/vision')
const { Email } = require('./../utils/EmailHelper.js')
const templates = require('./../utils/EmailTemplates.js')
const { Notificaciones } = require('./../notificaciones/Notifications.js')

class Posts {
  registerAudit (postId, newPost, oldPost) {
    // Reto
  }

  validatePostImage (file) {
  }

  isRight (result) {
    return (
      result !== 'POSSIBLE' &&
      result !== 'LIKELY' &&
      result !== 'VERY_LIKELY'
    )
  }

  updatePostStatus (postId, status) {
    const auditReference = admin
      .firestore()
      .collection('posts')
      .doc(postId)

    return auditReference.update({
      publicated: status
    })
  }

  sendInappropriateImageResponse (postId) {
    console.log(`Consultar Token postId => ${postId}`)

    return admin
      .firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then(post => {
        console.log(post)
        if (post.data().token !== null && post.data().token !== undefined) {
          console.log(`postId token => ${post.data().token}`)
          const notifications = new Notifications()
          notifications.registerTokenToTopic(
            'Posts con imagen no permitida',
            'Tu post no se puede mostrar ya que la imagen no es permitida',
            'notvalidacionimagen',
            post.data().token
          )
        }

        return post
      })
  }

  sendWeekPost (notificationTopic) {
    
  }
}

exports.Posts = Posts