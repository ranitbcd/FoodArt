const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/FoodArt",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database Connected Successfully!");
}).catch((err)=>{
    console.log("Problem in connection\n"+err);
})
require('./NewUserRegister');
require('./ItemModel');
require('./CartModel')