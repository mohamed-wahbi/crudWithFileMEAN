const express = require ('express') ;
const app = express();
require ('./config/connect')
require('dotenv').config();
const port = process.env.PORT;




app.listen(port,()=>{
    console.log('Server is active *_*');
})