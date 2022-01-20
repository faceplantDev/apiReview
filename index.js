const express = require('express')
const authRouter = require('./authRouter')
const postsRouter = require('./postsRouter')
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use("/auth", authRouter)
app.use("/posts", postsRouter)

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

