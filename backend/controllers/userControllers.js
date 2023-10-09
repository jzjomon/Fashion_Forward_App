const COURT = require('../models/courtModal.js');
const path = require('path')

const registerCourt = (req, res) => { 
    try{
        const files = req.files.img;
        const imageName = `${Date.now()}-${files.name}`;
        const filePath = path.join(__dirname,'../public/images',imageName );
        files.mv(filePath,(err) => {
            if(err){
                res.status(500).json({message: " Something went wrong"})
            }else{
                COURT({name : req.query.courtName, userId : req.userId , location : req.query.location, rate : req.query.rate, about : req.query.about, image : imageName }).save().then((result) => {
                    res.status(200).json({message : "Court registered successfully"})
                }).catch((err) => {
                    res.status(500).json({message : "Something went wrong"})
                }); 
            }
        })
    } 
    catch (err){ 
        res.status(500).json({message : "Something went wrong"});
    }
}

module.exports = { registerCourt } 