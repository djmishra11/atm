module.exports = (req, res, next) => {
    //get current user
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({msg: 'No user, authorization denied'});
    }

    try{
        //verify if the user have the right access
        if(token == 'admin'){
            next();
        }

    }catch(err){
         //handle error
         res.status(401).json({msg: 'User is not valid'});
    }
}