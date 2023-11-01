const router= require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model')
const auth = require('../middleware/auth')

router.route('/register').post(async (req,res)=>{
    try {
        const {username, password, mail, mobile} = req.body;
        if (!username || !password || !mail || !mobile)
            return res.status(400);
        const existUser = await User.findOne({'username' : username})
        if(existUser)
            return res.status(400).json({'error':"username already exists"});
        const salt = await bcrypt.genSalt();
        const phash = await bcrypt.hash(password,salt);
        const newuser  = new User({username,password:phash,mobile,mail})
        newuser.save().then(()=>res.json('signup success'))
    }
    catch (e) {
        res.status(500)
    }
})
router.route('/userData').get(auth,async (req,res)=>{
    const user = await User.findById(req.user).select("-password")
    return res.json(user)
})
router.route('/login').post(async (req,res)=>{
    try{
        const {username,password} = req.body;
        if(!username || !password)
            return res.status(400)
        const user = await User.findOne({'username':username});
        if(!user || !(await bcrypt.compare(password, user.password)))
            return res.status(400).json({msg:"invalid credtentials"})
        const token =  jwt.sign({id:user._id},process.env.JWT_TOKEN);
        res.json({
            token,
            'user':{
                id:user._id,
                username:user.username,
                email:user.email
            }
        })

    }
    catch (err) {
        res.status(500)
    }
})
router.route('/:id').get((req,res)=>{
    User.findOne({'username':req.params.id}).then((user)=>{
        if(user)
    {
        console.log('exist')
        res.json("exist")
    }
    else
        {

        res.json('doesnt exist')
        }
    })
        .catch(err =>res.status(400).json('Error'+err));
})

router.route("/isTokenValid").post(async (req,res)=>{
    try{
        const token = req.header('x-auth-token')
        if(!token) return res.json(false);
        const verify = jwt.verify(token,process.env.JWT_TOKEN);
        if(!verify) return res.json(false);
        const user = await User.findById(verify.id);
        if(!user) return res.json(false);

        return res.json(true);
    }
    catch (e) {
        return res.status(500)

    }
})



module.exports = router;