const server = require('./backend/src/app')
require('dotenv').config()
const connectToDB = require('./backend/src/db/db')

connectToDB()
server.listen(process.env.PORT,()=>{
    console.log('200 ok');
})