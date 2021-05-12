const router= require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let Bid = require('../models/bid.model')
let Item = require('../models/item.model')
const auth = require('../middleware/auth')
const {makebid} = require('../sockethelper')

router.route('/:productId').get((req,res)=>{
    Bid.find({'productId':req.params.productId}).then(bid=>{

        res.json(bid)
    }).catch(err=>res.status(400).json('Error: '+err))

})







router.route('/close').post(auth,async(req,res)=>{
    const userId = req.user;
    const id = req.body.id;
    Item.findById(id).then(async item=>{
        if(userId==item.sellerId) {
            item.bidOpen = false;
            await item.save();
            return res.json(true);
        }
        else
            return res.status(400).json({error:"unable to close bid"});

    })
})


router.route('/add').post(auth,async (req,res)=>{
    const userId = req.user;
    const productId = req.body.productId;
    const cost   = Number(req.body.cost);
    const user   = req.body.user;
    const bidTime = new Date().getTime();

    console.log(productId,bidTime)
    Item.findById(productId).then(async item=>{
        if(item.sellerId == userId)
            return res.status(400).json({success:false,latestBid:item.latestBid});
        if(item.bidOpen)
        {
            console.log(cost+" "+item.latestBid)
            if(item.latestBid<cost)
            {
                console.log(cost)
                item.latestBid = cost;
                await item.save()
                console.log(typeof (productId),typeof(bidTime))
                const newBid = new Bid({cost,user,productId,userId,bidTime})
                newBid.save().then(()=> {
                    makebid(newBid)
                    res.json(newBid)
                });


            }
            else
                return res.status(400).json({success:false,lastBid:item.latestBid})
        }

    })
})

module.exports = router