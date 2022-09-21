const { compareSync } = require("bcrypt")
const user = require("./model/user")

const register=async(req,res)=>{
    const data=new user(req,body)
    const result= await data.save()
    return res.status(200).json({
        success:true,
        message:"registerd successfully"
    })
}
const login=async(req,res)=>{
    const data=await user.findOne({email:req.body.email})
    if(!data){
        res.status(400).json({
            success:false,
            message:"please enter valid email id"
        })
    }
    const comparePassword=await bcrypt.compare(req.body,password,data.password)
    if(!comparePassword){
        res.status(401).json({
            success:false,
            message:"please enter correct password"
        })
    }
    res.status(200).json({
        success:true,
        message:"login successfully"
    })
}
const cart=async(req,res)=>{
    const data=await user.findOne({_id:usrId})
    if(!data){
        res.status(400).json({
            success:false,
            message:"user not found"
        })
    }
    const product=async(req,res)=>{
        const data=awiat product.findOne({_id:productId})
        if(!data){
            res.status(400).json({
                success:false,
                message:"product not found"
            }()
            const cart=new cart({
                products:product

            })

        }
    }
}


const multer=require('multer');
const uploads=multer({
    multer.diskStorage({
        destination:""
        filename(req,res,next){
            cb(null,file.originalname)
        }
    }).single
})

const genersteToken=async({email}){
    secretkey="mynameisharishmauryahacker"
    const token= await jwt.verify({email},secretkey)
    return token;
}
const verifyToken=async(req,res,next)=>{
    const auth=req.headers.authorization
    if(!auth){
        res.status(400).json({
            success:false
            message:"you are not be authorized"
        })
    }
    const verify= await jwt.verify(auth,secretkey)
        
    }  
    



