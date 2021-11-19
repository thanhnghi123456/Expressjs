const jwt = require('jsonwebtoken');

const requireAuth = (req,res,next)=>{
    //grab the token 
    const token = req.cookies.jwt;
    //check if it exists & is verified
    if(token){
        jwt.verify(token,'nghi',(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }else{
        res.redirect('/login');
    }
}
// check current user:
const checkUser= (req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
        jwt.verify(token,'nghi',async (err,decodedToken)=>{
            if(err){
               res.locals.user= null;
                next();
            }else{
                let user = await User.findById(decodedToken.id);
                res.locals.user=user;
                next();
            }
        })
    }else{
        res.locals.user= null;
        next();
    }
}

module.exports={requireAuth ,checkUser};