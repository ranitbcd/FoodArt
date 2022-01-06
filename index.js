require('./models/db');
const express=require('express');
const app=express();
const UserController=require('./controllers/UserController');
const ItemController=require('./controllers/ItemController');
const cartController=require("./controllers/cartController");
app.set('view engine','ejs');
app.use(express.static('./public'));
const bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({
    extended:true
}))
app.use('/user',UserController);
app.use('/items',ItemController);
app.use('/cart',cartController);
app.get('/',(req,res)=>{
    res.render('index');
})
app.listen(3000,()=>{
    console.log("server is running at port 3000");
})
