const Router = require('express')
const router = new Router()
const authController = require('./authController')
const {check} = require("express-validator")

router.post('/registration', [
    check('login', "Логин пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 5 и меньше 10 символов").isLength({min:5, max:15}),
    check('name', "Имя пользователя не может быть пустым").notEmpty()
], authController.registration)
router.post('/login', [
    check('login', "Логин пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 5 и меньше 10 символов").isLength({min:5, max:15})
], authController.login)

module.exports = router
