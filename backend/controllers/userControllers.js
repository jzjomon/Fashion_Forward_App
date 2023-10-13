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

const getCourts = (req, res) => {
    try {
        COURT.find().then(result => {
            res.status(200).json(result);
        }).catch(err => {
            res.status(401).json({message : "Something went wrong"});
        })
    } catch (error) {
        res.status(500).json({message : "Something went wrong"});
    }
}

const myCourts = (req, res) => {
    try {
        COURT.find({ userId : req.userId }).then(result => {
            res.status(200).json(result);
        }).catch(err => {
            res.status(401).json({message : "Something went wrong"});
        })
    } catch (error) {
        res.status(500).json({message : "Something went wrong"});
    }
}

const getCourt = (req, res) => {
    try { 
        COURT.findOne({ _id : req.query.id }).then(result => {
            res.status(200).json(result);
        }).catch(err => {
            res.status(401).json({message : "Something went wrong"});
        })
    } catch (error) {
        res.status(500).json({message : "Something went wrong"});
    }
}

module.exports = { registerCourt, getCourts, myCourts, getCourt } 