
//it will set up the main Html page to be rendered in the browser.

var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    //res.send('INDEX PAGE');// it will display the text in the browser.
    res.render('index.html');
});

module.exports=router;
