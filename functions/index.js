const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.addMessage = functions.https.onRequest(async (req, res) => {
    const original = req.query.text;
    const writeResult = await admin.firestore().collection('test').add({original: original});
    res.json({result: `Message with ID: ${writeResult.id} added.`});
})

exports.makeUppercase = functions.firestore.document('/test/{documentId}')
  .onCreate((snap, context) => {
      const original = snap.data().original;
      const uppercase = original.toUpperCase();
      return snap.ref.set({uppercase}, {merge: true});
    });
