const mongoose=require('mongoose');
const itemSchema=new mongoose.Schema({
    icode:Number,
    iname:String,
    category:String,
    price:Number,
    image:String
    
});
module.exports=mongoose.model('Itemdetails',itemSchema);