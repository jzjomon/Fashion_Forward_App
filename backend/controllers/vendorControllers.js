const COURT_SCHEDULES = require('../models/courtScheduleModal.js');

const addTimings = (req, res) => {
    try {

        let startDate = new Date(req.body.data.date.startDate);
        let endDate = new Date(req.body.data.date.endDate);
        const timingObj = [];
        while (startDate <= endDate) {
            req.body.data.schedules.forEach(obj => {
                timingObj.push({
                    date : JSON.parse(JSON.stringify(startDate)),
                    slot : {
                        time : obj.time,
                        id : obj.id
                    },
                    rate : req.body.data.rate,
                    courtId : req.body.data.courtId
                });
            });
            startDate.setDate(startDate.getDate() + 1);
        };
        COURT_SCHEDULES.insertMany(timingObj).then(response => {
            res.status(200).json({ message : "success"});
        }).catch(err => {
            res.status(400).json({ message : err.message });
        });
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
}

module.exports = { addTimings }