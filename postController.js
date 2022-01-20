const db = require('./helper/db').connection;
const { validationResult } = require('express-validator')

class postController {
    newPost(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors});
            }
            const {title, content} = req.body;
            const timestamp = new Date()
            db.query(
                `INSERT INTO posts (title, content, timestamp) VALUES (?, ?, ?)`,
                [title, content, timestamp], (err, results) => {
                    if(err) return res.status(400).json({message: "Something went wrong..."})
                    res.status(200).json({message: `Post created successfully at id ${results.insertId}`})
                }
            )
        } catch(e) {
            console.log(e)
            return res.status(400).json({message: "Post error"})
        }
    }

    getById(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors});
            }
            const { id } = req.body
            db.query(
                'SELECT * FROM posts WHERE id = ?',
                [id], (err, results) => {
                    if(!results[0]) return res.status(404).json({message: `Post with id ${id} not found`})
                    res.status(200).json(results[0])
                }
            )
        } catch(e) {
            console.log(e)
            return res.status(400).json({message: "Search Post error"})
        }
    }

    getPosts(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors});
            }
            db.query(
                `SELECT * FROM posts`,
                (err, results) => {
                    let json = {}
                    results.forEach(result => json[result.id] = {
                        title: result.title,
                        content: result.content,
                        timestamp: result.timestamp
                    })
                    res.status(200).json(json)
                }
            )
        } catch(e) {
            console.log(e)
            return res.status(400).json({message: "Search Posts error"})
        }
    }

    deleteById(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors});
            }
            const { id } = req.body
            db.query(`SELECT id FROM posts WHERE id = ?`,
            [id], (err, results) => {
                if(!results[0]) return res.status(404).json({message: `Post with id ${id} not found`})
                db.query(
                    'DELETE FROM posts WHERE id = ?',
                    [id], (err, results) => {
                        if(err) return res.status(400).json({message: `Error`})
                        res.status(200).json({message: "Post deleted"})
                    }
                )
            })
        } catch(e) {
            console.log(e)
            return res.status(400).json({message: "Delete Post error"})
        }
    }
}

module.exports = new postController()