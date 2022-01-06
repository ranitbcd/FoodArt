const express=require('express');
const router=express.Router();
const multer =require('multer');
const path=require('path');
const mongoose=require('mongoose');
const ItemController=mongoose.model('Itemdetails');
const CartController=mongoose.model('cartDetails');
router.use(express.static('public'));
var imagename='';
router.get("/",(req,res)=>{
    res.render("item",{msg:' '});
})
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/images');
    },
    filename:(req,file,cb)=>{
        //cb(null,Date.now()+path.extname(file.originalname)); 
        imagename=Date.now()+path.extname(file.originalname);
        cb(null,imagename);
    }
})
const upload=multer({
    storage:storage
})
router.post("/",upload.single('image'),(req,res,next)=>{
    const item=new ItemController();
    item.icode=req.body.icode;
    item.iname=req.body.iname;
    item.category=req.body.category;
    item.price=req.body.price;
    item.image=imagename;
    item.save((err,data)=>{
        if(!err)
        res.render('item',{msg:'data save successfully!!!'})
        
    })
})
/*router.get("/", (req, res) => {
    item.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});*/
/*router.get('/upload-contant',(req,res)=>{
    ItemController.find((err,data)=>{
        if(!err)
        console.log(data);
        res.render('viewimage',{data:data});
    })
})*/
router.get('/order',(req,res)=>{
    const icode = req.query;
    ItemController.find(icode).then((result,err)=>{
        if (err)
            throw err;
        console.log(result)
        res.render('addtocart',{data:result[0]});
    
    }).catch((err)=>{
        console.log(err);
    })
});
 

   
router.get('/autocomplete/',(req,res,next)=>{
    var regex=new RegExp(req.query["term"],'i');
    var  studentfilter= ItemController.find({iname:regex},{'iname':1}).sort({"updated_at":-1}).sort({"created_at":-1}).limit(20);
    studentfilter.exec(function(err,data){
    var result=[];
    if(!err){
        if(data && data.length && data.length>0){
            data.forEach(food=>{
                let obj={
                    id:food._id,
                    label:food.iname
                };
                result.push(obj);
            });
        };
        
        res.jsonp(result);
    };
    });
    });
 


    
module.exports=router;
