require('dotenv').config();
const app = require('./src/app');

// Ensure DB is initialized before starting the server
require('./src/db/database');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
