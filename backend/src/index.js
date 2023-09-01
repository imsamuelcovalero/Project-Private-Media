/* index.js */
require('dotenv').config();
require('./database/loadFirebaseConfig');

const app = require('./app');
require('./database/connection');

const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => console.log(`Running server on port: ${PORT}`));
