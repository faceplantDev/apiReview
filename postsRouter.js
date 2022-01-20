const Router = require('express')
const router = new Router()
const postController = require('./postController')
const authMiddleware = require("./middleware/authMiddleware")
const {check} = require("express-validator")

router.post('/newpost', [
    check('title', "Заголовок не может быть пустым").notEmpty(),
    check('content', "Контент пользователя не может быть пустым").notEmpty()
], authMiddleware, postController.newPost)
router.post('/getbyid', [
    check('id', "id пользователя не может быть пустым").notEmpty(),
], authMiddleware, postController.getById)
router.post('/deletebyid', [
    check('id', "id пользователя не может быть пустым").notEmpty(),
], authMiddleware, postController.deleteById)
router.get('/getposts', authMiddleware, postController.getPosts)

module.exports = router
