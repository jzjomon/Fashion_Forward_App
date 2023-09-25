const USER = require('../models/userModal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = (req, res) => {
    try {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                res.status(500).json({ error: true });
            } else {
                USER.findOne({ email: req.body.email }).then((result) => {
                    if (result) {
                        res.status(500).json({ exist: true })
                    } else {
                        USER({ firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: hash }).save().then((result) => {
                            res.status(200).json({ success: true });
                        }).catch((err) => {
                            res.status(500).json({ error: true })
                        });
                    }
                }).catch((err) => {
                    res.status(500).json({ error: true })
                });
            }
        })
    }
    catch (err) {
        res.status(500).json({ error: true })
    }
}

const login =  (req, res) => {
    try {
        USER.findOne({ email: req.body.email }).then(data => {
            bcrypt.compare(req.body.password, data.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({userid: data._id},process.env.TOKENPASS ,{
                        expiresIn:"3d"
                    });
                    res.status(200).json({ token: token , email: data.email, firstname: data.firstname, lastname: data.lastname, role: data.role});
                } else {
                    res.status(500).json({ password: true });
                }
            })
        }).catch(err => {
            res.status(500).json({ exist: true })
        })
    }
    catch (err) {
        res.status(500).json({ error: true });
    }
}

 
module.exports = { signUp, login }