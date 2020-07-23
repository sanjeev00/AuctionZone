const router= require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let Bid = require('../models/bid.model')
let Item = require('../models/item.model')
const auth = require('../middleware/auth')



router.route('/:productId').get((req,res)=>{
    Bid.find({'productId':req.params.productId}).then(bid=>{
        if(bid.length===0)
        {
            return res.json(false);
        }
        res.json(bid)
    }).catch(err=>res.status(400).json('Error: '+err))

})

router.route('/add').post(auth,async (req,res)=>{
    const userId = req.user;
    const productId = req.body.productId;
    const cost   = Number(req.body.cost);
    const user   = req.body.user;
    const bidTime = new Date().getTime();

    console.log(productId,bidTime)
    Item.findById(productId).then(async item=>{
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
                newBid.save().then(()=>res.json(newBid));

            }
            else
                return res.status(400).send(false)
        }

    })
})

module.exports = router