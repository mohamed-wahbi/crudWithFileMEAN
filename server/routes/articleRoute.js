const express = require("express");
const route = express.Router();
const path = require("path");
const articleModel = require("../models/articleModel.js");
const multer = require("multer");

let fileUploadName = "";

// Path for serving static files (images)
// const uploadDirectory = path.join(__dirname, "upload");
// route.use("/upload", express.static(uploadDirectory));





const myStorage = multer.diskStorage({
  destination: "./upload",
  filename: (req, file, callback) => {
    let date = Date.now();
    let namingFile = date + "." + file.mimetype.split("/")[1];
    callback(null, namingFile);
    fileUploadName = namingFile;
  },
});

const upload = multer({ storage: myStorage });

route.post("/createArticle", upload.any("image"), async (req, res) => {
  try {
    const { title, description, price, image } = req.body;
    const newArticle = new articleModel({ title, description, price, image });
    newArticle.image = fileUploadName;
    const savedArticle = await newArticle.save();
    fileUploadName = "";
    savedArticle
      ? res
          .status(200)
          .send({ article: newArticle, message: "Article bien ajouté." })
      : res.status(404).send("Article non ajouté.");
  } catch (error) {
    console.log("Erreur lors de la création d'un article :", error);
    res.status(500).send(error);
  }
});

route.get("/getAllArticle", async (req, res) => {
  try {
    const allArticle = await articleModel.find({});
    allArticle
      ? res
          .status(200)
          .send({ article: allArticle, message: "Articles trouvés." })
      : res.status(404).send("Aucun article trouvé.");
  } catch (error) {
    console.log("Erreur lors de la récupération des articles :", error);
    res.status(500).send(error);
  }
});

route.get("/getArticleById/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const article = await articleModel.findById({ _id: id });
    article
      ? res.status(200).send({ article: article, message: "Article trouvé." })
      : res.status(404).send("Aucun article trouvé avec cet ID.");
  } catch (error) {
    console.log("Erreur lors de la récupération d'un article par ID :", error);
    res.status(500).send(error);
  }
});

route.delete("/deleteArticle/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedArticle = await articleModel.findByIdAndDelete({ _id: id });
    deletedArticle
      ? res
          .status(200)
          .send({
            article: deletedArticle,
            message: "Article bien supprimé.",
          })
      : res.status(404).send("Article non supprimé.");
  } catch (error) {
    console.log("Erreur lors de la suppression d'un article par ID :", error);
    res.status(500).send(error);
  }
});

route.put("/updateArticle/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, price, image } = req.body;

    const updatedArticle = await articleModel.findByIdAndUpdate(
      { _id: id },
      { title, description, price, image },
      { new: true, runValidators: true }
    );

    updatedArticle
      ? res
          .status(200)
          .send({ article: updatedArticle, message: "Article bien modifié." })
      : res.status(404).send("Article non modifié.");
  } catch (error) {
    console.log("Erreur lors de la mise à jour d'un article par ID :", error);
    res.status(500).send(error);
  }
});

module.exports = route;
