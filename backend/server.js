const server = require('./src/app');
require('dotenv').config();
const connectToDB = require('./src/db/db');

connectToDB();

server.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT);
});
