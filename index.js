var express = require('express'),
bodyparser = require('body-parser'),
app = express(),
port = 3030,
router = require('./router'),
multiChainConfig = require('./multiChainConfig'),
common = require('./common'),
multichain = require("multichain-node")({
    port: multiChainConfig.port,
    host: multiChainConfig.host,
    user: multiChainConfig.user,
    pass: multiChainConfig.pass
});

app.get('/', function(req, res) {
    res.send("This is demo!");
});

// Middelware 
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use('/api/demo', router);

app.listen(port, function(){
    console.log("Server is running!");
});


/*multichain.getInfo((err, info) => {
    if(err){
        throw err;
    }
   // console.log(info);
})

multichain.sendwithData({address: multiChainConfig.address, amount: 0.1, data: common.toHex('patel')}, (err, tx) => {
    if(err){
        throw err;
    }
    multichain.getRawTransaction({txid: tx}, (err, tx) => {

    multichain.decodeRawTransaction({"hexstring": tx}, (err, dTx) => {
        console.log(common.hex2String(dTx.data));
    })
})
})

*/


