const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bodyParser = require("body-parser");
const RegisterModal = require("../modals/register");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10;
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', urlencodedParser, (req, res, next) => {
    bcrypt.hash(req.query.password, saltRounds, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        else {
            const user = RegisterModal({
                _id: new mongoose.Types.ObjectId,
                username: req.query.username,
                password: hash,
                phone: req.query.phone,
                name: req.query.name,
            });

            user.save().then(result => {
                console.log(result);
                res.status(200).json({
                    newUser: result,
                })
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
        }
    })
});



module.exports = router;