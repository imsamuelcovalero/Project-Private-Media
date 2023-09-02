/* File: src/database/loadFirebaseConfig.js */
const fs = require('fs');
const path = require('path');
const boom = require('@hapi/boom');

try {
  /* Resolve o caminho absoluto do arquivo firebaseKey.json */
  const firebaseKeyPath = path.join(__dirname, 'firebaseKey.json');
  /* Lê o arquivo firebaseKey.json */
  const rawData = fs.readFileSync(firebaseKeyPath);
  /* Converte o arquivo lido para JSON */
  const jsonData = JSON.parse(rawData);

  /* Define as variáveis de ambiente com os dados do arquivo firebaseKey.json */
  process.env.FIREBASE_PROJECT_ID = jsonData.project_id;
  process.env.FIREBASE_PRIVATE_KEY_ID = jsonData.private_key_id;
  process.env.FIREBASE_PRIVATE_KEY = jsonData.private_key.replace(/\\n/g, '\n');
  process.env.FIREBASE_CLIENT_EMAIL = jsonData.client_email;
  process.env.FIREBASE_CLIENT_ID = jsonData.client_id;
  process.env.FIREBASE_AUTH_URI = jsonData.auth_uri;
  process.env.FIREBASE_TOKEN_URI = jsonData.token_uri;
  process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL = jsonData.auth_provider_x509_cert_url;
  process.env.FIREBASE_CLIENT_X509_CERT_URL = jsonData.client_x509_cert_url;
} catch (error) {
  console.error('Erro ao carregar arquivo de configuração do Firebase:', error);
  throw boom.internal('Erro ao carregar arquivo de configuração do Firebase.', error);
}