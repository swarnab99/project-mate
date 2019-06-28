const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello, ninjas!");
});


// * This function will add the information(notificaion) to the notifications collection
const createNotification = (notification => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc))
})



// * This cloud function will run whenever a NEW PROJECT is created
exports.projectCreated = functions.firestore
  .document('projects/{projectId}')
  .onCreate(doc => {

    const project = doc.data();
    const notification = {
      type: 'new_project',
      projectTitle: `${project.title}`,
      firstName: project.authorFirstName,
      lastName: project.authorLastName,
      time: admin.firestore.FieldValue.serverTimestamp(),
      initials: project.authorFirstName[0].toUpperCase() + project.authorLastName[0].toUpperCase()  
    }

    return createNotification(notification)
});


// * This cloud function will run whenever a NEW USER joined
exports.userJoined = functions.auth.user()
  .onCreate(user => {
    return admin.firestore().collection('users')
      .doc(user.uid).get().then(doc => {

        const newUser = doc.data();
        const notification = {
          type: 'new_user',
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          time: admin.firestore.FieldValue.serverTimestamp(),
          initials: newUser.firstName[0].toUpperCase() + newUser.lastName[0].toUpperCase() 
        }

        return createNotification(notification)
  })
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
