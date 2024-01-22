const mongoose = require ('mongoose');
require('dotenv').config();
const urlDb = process.env.URL_DB;
mongoose.connect ('mongodb://127.0.0.1:27017/mean-crud')
.then(
    ()=>{
        console.log (urlDb)
    }
)
.catch(
    (error)=>{
        console.log ('Error in connecting with DB !',error)
    }
)

module.exports = mongoose ;
