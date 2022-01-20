const { validationResult } = require('express-validator')
const db = require('./helper/db').connection;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors});
            }
            const {login, password, name} = req.body;
            db.query(
                `SELECT * INTO users WHERE login = ?`,
                [login], (err, result) => {
                    if(result) return res.status(400).json({message: "User already registred"})
                    bcrypt.hash(password, 1, (err, hashpassword) => {
                        db.query(
                            `INSERT INTO users (login, passhash, name) VALUES (?, ?, ?)`,
                            [login, hashpassword, name], (err, result) => {
                                if(!err) return res.status(200).json({message: "User registration successful"})
                                res.status(400).json({message: "User registration failed"})
                            }
                        )
                    })
                }
            )
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors});
            }
            const {login, password} = req.body;
            db.query(
                `SELECT * FROM users WHERE login = ?`,
                [login], (err, result) => {
                    if(!result) return res.status(400).json({message: "User not found"})
                    bcrypt.compare(password, result[0].passhash, (err, result) => {
                        if(result) {
                            let token = jwt.sign({id: result[0]}, "MAJESTIC", {expiresIn: "24h"})
                            return res.json({token: token})
                        }
                        res.status(400).json({message: "Incorrect password"})
                    })
                })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
}

module.exports = new authController()
