const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
router.use(express.static('public'));
const cart=mongoose.model('cartDetails');

router.get('/',(req,res)=>{
    cart.find().then((result,err)=>{
        if(!err)
        res.render('cart',{data:result});
    }).catch((error)=>{
        console.log(error);
    });
});
router.get('/bill',(req,res)=>{
    
    const icode=req.query;
       console.log(icode);
       cart.deleteOne(icode).then((result,err)=>{
        if(!err)
        {
            cart.find().then((result,err)=>{
                if(!err)
                res.render('cart',{data:result});
            }).catch((error)=>{
                console.log(error);
            });
        }
       }).catch((error)=>{
           console.log(error);
       });
       
})
module.exports=router;