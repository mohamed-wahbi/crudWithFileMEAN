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


app.get('/getAllArticle',async (req,res)=>{
    try {
        const allArticle = await articleModel.find({});
        allArticle?res.status(200).send({article:allArticle,message:"article trouver ."}):res.status(404).send("article non trouver !");
    } catch (error) {
        console.log("error lors de la fetching d'article !");
        res.status(500).send(error);
    }
})

app.get('/getArticleById/:id', async (req,res)=>{
    try {
        const id = req.params.id ;
        const article = await articleModel.findById({_id:id});
        article?res.status(200).send({article:article,message:"article id trouver ."}):res.status(404).send("article id non trouver !");
    } catch (error) {
        console.log("error lors de la fetching d'un article avec id!");
        res.status(500).send(error);
    }
})







app.listen(port,()=>{
    console.log('Server is active *_*');
})