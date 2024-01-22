const express = require ('express') ;
const app = express();
require ('./config/connect')
require('dotenv').config();
const port = process.env.PORT;
const articleModel = require ('./models/articleModel');
const cors = require ("cors");
app.use (cors());
app.use (express.json())



app.post('/createArticle',async (req,res)=>{
    try {
        const {title,discription ,price ,image} = req.body;
        const newArticle =  new articleModel({title,discription ,price ,image});
        const savedArticle =await newArticle.save();
        savedArticle? res.status(200).send({article:newArticle,message:"article bien ajouter ."}):res.status(404).send("article non ajouter");
    } catch (error) {
        console.log("error lors de la creation d'article !");
        res.status(500).send(error);
    }
})


app.listen(port,()=>{
    console.log('Server is active *_*');
})