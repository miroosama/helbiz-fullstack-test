const express = require('express');
const router = express.Router();

//Transfer Model

const Transfer = require('../../models/transferSchema');

//@route GET api/transfers
//@desc get all transfers
//@access Public

router.get('/', (req, res) =>{
  Transfer.find()
    .sort('-createdAt')
    .then(transfers => res.json(transfers))
})

//@route POST api/transfers
//@desc post new transfer
//@access Public

router.post('/', (req, res) =>{
  const newTransfer = new Transfer({
    from: req.body.from,
    to: req.body.to,
    amount: req.body.amount
  })

  newTransfer.save().then(item => res.json(item))
})

module.exports = router;
