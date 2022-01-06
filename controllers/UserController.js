const express=require('express');
const mongoose=require('mongoose');
const nodemailer=require('nodemailer');
const usercontroller=mongoose.model('RegisterUser');
const ItemController=mongoose.model('Itemdetails');
const CartController = mongoose.model('cartDetails');
const router=express.Router();


const sessions = require('express-session');
const bodyparser = require('body-parser')
router.use(bodyparser.urlencoded({
    extended:true
}))
router.use(express.static('public'));
router.get("/",(req,res)=>{
    res.render("register",{msg:' '});
})
router.get("/logout",(req,res)=>{
    res.render("login",{msg:' '});
})
router.post("/",(req,res)=>{
    const user=new usercontroller();
    user.uname=req.body.uname;
    user.pwd=req.body.pwd;
    user.mail_id=req.body.mail_id;
    user.gender=req.body.gender;
    user.dob=req.body.dob;
    user.contact_no=req.body.contact_no;
    user.save((err,data)=>{
        if(!err)
        res.render('register',{msg:'Login Your Register Account!!!'});
        sendMail(user.mail_id,user.pwd);
        
    })
})
router.get('/login',(req,res)=>{
    res.render('login',{msg:' '});
})
var c=0;
function getCartCount(req,res)
{
   c=0;
   CartController.find().then((result,err)=>{
      if(!err){
           result.forEach((i)=>{
              c+=i.qty;
          });
          
      }
      else
      return 0;
  }).catch((err)=>{
      console.log("Problem in connection\n"+err);
  })
}

router.post('/checkout',(req,res)=>{
  const cart=new CartController();
  cart.icode=req.body.icode;
  cart.iname=req.body.iname;
  cart.image=req.body.image;
  cart.price=req.body.price;
  cart.qty=req.body.qty;
  cart.save((err,data)=>{
      if(!err)
      console.log("success");
      var c=getCartCount()
      
      res.render('addtocart',{data:data});
      
  });
});
router.post('/dashboard',async(req,res)=>{
    
    
        getCartCount(req,res);
        const email = req.body.mail_id;
        const password =req.body.pwd;
        const useremail =   await usercontroller.findOne({mail_id:email});
        if(useremail.pwd === password){
            ItemController.find((err,data)=>{
                if(!err)
                console.log(data);
                res.render('dashboard',{data:data,cartcount:c});
            })
        }else{
          
            res.render('login',{msg:'Invalid Crediantial'},{mail_id:mail_id});
        }
       
    
})
/*router.post('/dashboard',(req,res)=>{
    var uname = req.body.uname;
    var pwd = req.body.pwd;
    query = {$and:[{mail_id:uname},{pwd:pwd}]}
    usercontroller.find(query).then((result)=>{
        //res.json(result);
        res.render('index',{logalt:1,data:result[0]})
    }).catch((err)=>{
        console.log(err);
    })
})*/

function sendMail(mail_id,pwd){
    const transporter = nodemailer.createTransport({
      service:'gmail',
      auth:{
          user:'svmcomputer1234@gmail.com',
          pass:'svm@1234'
      }  
    });
    const reciver={
        from:'svmcomputer1234@gmail.com',
        to:mail_id,
        subject:'welocome to foodart',
        text:'you are successfully registerd!!! you mail-id='+mail_id+' and password='+pwd
    };
    transporter.sendMail(reciver,(err,result)=>{
        if(err)
            console.log(err)
        else
            console.log('Mail Send Successfully');
    })
}
router.use(sessions({
    secret: "Hello World",
    saveUninitialized:true,
    resave: false
}));
//auto search secction
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