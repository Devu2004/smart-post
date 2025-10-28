const mogoose = require('mongoose')

function connectToDB(){
    mogoose.connect(process.env.MONGO_DB_URI).then(()=>{
        console.log('Connected To DB');
    }).catch(err=>{
        console.log('invailid URL',err);
    })
}

module.exports = connectToDB