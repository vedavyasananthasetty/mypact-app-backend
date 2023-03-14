const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const authContoller = require('./controllers/authController')
const userController = require('./controllers/userController')
const postController = require('./controllers/postController')
const commentController = require('./controllers/commentController')
const uploadController = require('./controllers/uploadController')
const app = express()
PORT = process.env.PORT

//connect backend app
app.listen(PORT, () => console.log('server is connected port:'+PORT))

//connect to mongodb database
const connectDB= async (req,res) => {
  try {
    mongoose.set('strictQuery', true)
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log('connected to MongoDb')
  } catch (error) {
    console.log('unable to connect to MongoDb')
  }
}
connectDB()


//routes
app.use('/images', express.static('public/images'))
app.use(cors({
  origin: ["http://localhost:3000/", "https://my-pact-app.onrender.com"]
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/auth', authContoller)
app.use('/user', userController)
app.use('/post', postController)
app.use('/comment', commentController)
app.use('/upload', uploadController)



