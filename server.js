const server = require('./src/app')
require('dotenv').config()
const connectToDB = require('./src/db/db')

connectToDB()
server.listen(process.env.PORT,()=>{
    console.log('200 ok');
})