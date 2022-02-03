const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bodyParser = require("body-parser");
const RegisterModal = require("../modals/register");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10;


router.post('/', (req, res, next) => {

    RegisterModal.find({ username: req.query.username }).exec().then(user => {


        if (user.length < 1) {
            return res.status(401).json({
                mes: "User Not Exits"
            });
        }
        bcrypt.compare(req.query.password, user[0].password, (err, result) => {
            if (!result) {
                return res.status(401).json({
                    mes: "Password not matching"
                });
            }
            if (result) {
                const token = jwt.sign({
                    username: user[0].username,
                    userType: user[0].userType,
                    email: user[0].email,
                    phone: user[0].phone,
                }
                    ,
                    "This is secret key", {
                    expiresIn: "24h"
                }

                );

                res.status(200).json({
                    username: user[0].username,
                    userType: user[0].userType,
                    email: user[0].email,
                    phone: user[0].phone,
                    token: token,
                })

            }
        });
    }).catch(err => {
        res.status(500).json({
            err: err
        });

    });
})


module.exports = router;