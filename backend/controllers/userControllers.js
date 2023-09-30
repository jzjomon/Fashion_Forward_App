const COURT = require('../models/courtModal.js');
const path = require('path')

const registerCourt = (req, res) => { 
    try{
        const files = req.files.img;
        const imageName = `${Date.now()}-${files.name}`;
        const filePath = path.join(__dirname,'../public/images',imageName );
        files.mv(filePath,(err) => {
            if(err){
                console.log('error happend');
            }else{
                COURT({name : req.query.courtName, location : req.query.location, rate : req.query.rate, about : req.query.about, image : imageName }).save().then((result) => {
                    console.log(result);
                }).catch((err) => {
                    console.log(err);
                }); 
            }
        })
    } 
    catch (err){ 
 
    }
}

module.exports = { registerCourt } 