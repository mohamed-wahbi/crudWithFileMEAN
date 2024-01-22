const mongoose = require ('mongoose');
const articleSchema = new mongoose.Schema ({
    title:String ,
    discription:String ,
    price:Number ,
    image:String
})

const articleModel = mongoose.model('Articles',articleSchema);

module.exports = articleModel ;