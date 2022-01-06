const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    uname:String,
    pwd:String,
    mail_id:String,
    gender:String,
    dob:Date,
    contact_no:Number
});
module.exports=mongoose.model('RegisterUser',userSchema);