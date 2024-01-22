const express = require ('express') ;
const app = express();
require ('./config/connect')
require('dotenv').config();
const port = process.env.PORT;
const articleModel = require ('./models/articleModel');
const multer = require('multer');
const cors = require ("cors");
app.use (cors());
app.use (express.json())
const path = require('path');

let fileUplodeName = ""





const uploadDirectory = path.join(__dirname, 'upload');

app.use('/upload', express.static(uploadDirectory));




const myStorage =multer.diskStorage({
    destination:'./upload',
    filename:(res,file,redirect)=>{
        let date = Date.now();
        let namingFile = date+"."+file.mimetype.split("/")[1];
        redirect(null,namingFile);
        fileUplodeName = namingFile ;
    }
})

const upload = multer({storage:myStorage}) ;

app.post('/createArticle',upload.any('image'),async (req,res)=>{
    try {
        const {title,discription ,price ,image} = req.body;
        const newArticle =  new articleModel({title,discription ,price ,image});
        newArticle.image = fileUplodeName ;
        const savedArticle =await newArticle.save();
        fileUplodeName="";
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


app.delete('/deleteArticle/:id',async (req,res)=>{
    try {
        const id = req.params.id;
        const deletedArticle = await articleModel.findByIdAndDelete({_id:id});
        deletedArticle?res.status(200).send({article:deletedArticle,message:'article est bien suprimer'}):res.status(404).send('article non supprimer !');
    } catch (error) {
        console.log("error lors de la deleting d'un article avec id!");
        res.status(500).send(error);
    }
})


app.put('/updateArticle/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, price, image } = req.body;

        const updatedArticle = await articleModel.findByIdAndUpdate(
            { _id: id },
            { title, description, price, image },
            { new: true, runValidators: true }
        );

        updatedArticle ? res.status(200).send({ article: updatedArticle, message: 'Article bien modifié.' }) : res.status(404).send('Article non modifié.');
    } catch (error) {
        console.log("Erreur lors de la mise à jour d'un article avec l'ID :", error);
        res.status(500).send(error);
    }
});







app.listen(port,()=>{
    console.log('Server is active *_*');
})