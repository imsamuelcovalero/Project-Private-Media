/* File: src/database/connection.js */
const admin = require('firebase-admin');
const boom = require('@hapi/boom');

let db;

try {
  // Inicialize o aplicativo Firebase Admin com as credenciais de serviço
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });

  db = admin.firestore();
} catch (error) {
  console.error('Erro ao conectar com o Firebase:', error);
  throw boom.internal('Erro ao conectar com o Firebase.', error);
}

module.exports = db;



