/* File: src/database/loadFirebaseConfig.js */
const fs = require('fs');
const path = require('path');
const boom = require('@hapi/boom');

try {
  // Resolve o caminho absoluto do arquivo firebaseKey.json
  const firebaseKeyPath = path.join(__dirname, 'firebaseKey.json');
  // Leia o arquivo JSON.
  const rawData = fs.readFileSync(firebaseKeyPath);
  // Converta o arquivo JSON em um objeto JavaScript.
  const jsonData = JSON.parse(rawData);

  // Defina as variáveis de ambiente.
  process.env.FIREBASE_PROJECT_ID = jsonData.project_id;
  process.env.FIREBASE_PRIVATE_KEY_ID = jsonData.private_key_id;
  process.env.FIREBASE_PRIVATE_KEY = jsonData.private_key.replace(/\\n/g, '\n'); // Resolva problemas com a formatação da chave privada
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