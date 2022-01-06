const mongoose=require('mongoose');
const cartSchema = new mongoose.Schema({
    icode: Number,
    iname: String,
    price: Number,
    qty:Number,
    image:String
})
module.exports=mongoose.model('cartDetails',cartSchema);