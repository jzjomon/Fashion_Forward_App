const COURT = require('../models/courtModal.js');
const path = require('path');
const COURT_SCHEDULES = require('../models/courtScheduleModal.js');

const registerCourt = (req, res) => { 
    try{
        const files = req.files.img;
        const imageName = `${Date.now()}-${files.name}`;
        const filePath = path.join(__dirname,'../public/images',imageName );
        files.mv(filePath,(err) => {
            if(err){
                res.status(500).json({message: " Something went wrong"})
            }else{
                COURT({name : req.query.courtName, userId : req.userId , location : req.query.location, about : req.query.about, image : imageName }).save().then((result) => {
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
        const page = req.query.page;
        const limit = 8;
        const start = (page - 1) * limit;
        COURT.find().limit(limit).skip(start).then(result => {
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

const getLatestDate = (req, res) => {
    try {
        COURT_SCHEDULES.find({courtId : req.query.courtId}).sort({date : -1}).then(response => {
            res.status(200).json({latestDate : new Date(response[0].date.setDate(response[0].date.getDate() + 1))});
        }).catch(error => {
            console.log(error);
        })
    } catch (error) {
      res.status(500).json({message : "Something went wrong"});  
    }
}

module.exports = { registerCourt, getCourts, myCourts, getCourt, getLatestDate } 