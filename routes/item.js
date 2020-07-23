const router= require('express').Router();
let Item = require('../models/item.model')
const auth = require('../middleware/auth')
const fileUpload = require('express-fileupload')
const express  = require('express')
var path = require('path');



router.use(fileUpload())
router.route('/').get((req,res)=>{
    Item.find().then(items=>res.json(items)).catch(err=>res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res)=>{
    const data =  req.body;
    const name = data.name;
    const cost  = Number(data.cost);
    const condition = data.condition;
    const seller = data.seller;
    const newItem = new Item({name,cost,condition,seller})
    newItem.save().then(()=>res.json('Item added!')).
    catch(err=>res.status(400).json('Error: '+err));
});


router.route('/:id').get((req,res)=>{
    Item.findById(req.params.id).then(item =>res.json(item))
        .catch(err =>res.status(400).json('Error'+err));
})

router.route('/:id').delete((req,res)=>{
    Item.findByIdAndDelete(req.params.id).then(item =>res.json("Item deleted"))
        .catch(err =>res.status(400).json('Error'+err));
})


router.route('/update/:id').post((req,res)=>{
        Item.findById(req.params.id).then(item =>{
            item.name = req.body.name;
            item.cost = Number(req.body.cost);
            item.condition = req.body.condition;
            item.save()
                .then(() =>res.json('item updated')).
            catch(err=>res.status(400).json("Error "+err));

        })
            .catch(err=>res.status(400).json("Error "+err))



    }
);

router.route('/new').post(auth,async (req,res)=>{

    const data =  req.body;

    const name = data.name;

    const cost  = Number(data.cost);
    const condition = data.condition;
    const seller = data.seller;
    const sellerId = req.user;
    let imageFile = req.files.file;
    let filenm =  Math.random().toString(36).substring(7);
    var dir = path.resolve(__dirname, '..')
    console.log(`${dir}/public/${filenm}.jpg`)
    imageFile.mv(`${dir}/public/${filenm}.jpg`,function(err){
        if(err){
            return res.status(400).send(err);
        }
        const image = `public/${filenm}.jpg`;

        const newItem = new Item({name,cost,condition,seller,image,sellerId})
        newItem.save().then(()=>res.json('Item added!'));
    })

})
module.exports = router;