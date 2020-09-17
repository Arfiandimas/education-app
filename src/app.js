const express = require('express')
require('./db/mongoose')
const adminRouter = require('./routers/admin')
const categoryRouter = require('./routers/category')
const commentRouter = require('./routers/comment')
const educationRouter = require('./routers/education')
const userRouter = require('./routers/user')

const app = express()

app.use(express.json())

app.use(adminRouter)
app.use(categoryRouter)
app.use(commentRouter)
app.use(educationRouter)
app.use(userRouter)

module.exports = app