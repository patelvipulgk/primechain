var express = require('express'),
router = express.Router(),
multiChainConfig = require('./multiChainConfig'),
common = require('./common'),
multichain = require("multichain-node")({
    port: multiChainConfig.port,
    host: multiChainConfig.host,
    user: multiChainConfig.user,
    pass: multiChainConfig.pass
});

router.post('/', function(req, res) {
    multichain.sendwithData({address: multiChainConfig.address, amount: 0.1, data: common.toHex(req.body.title)}, (err, tx) => {
    if(err){
        throw err;
    }
    multichain.getRawTransaction({txid: tx}, (err, tx) => {

    multichain.decodeRawTransaction({"hexstring": tx}, (err, dTx) => {
        console.log(common.hex2String(dTx.data));
        res.send(common.hex2String(dTx.data));
    })
})
})

    
});


module.exports = router;