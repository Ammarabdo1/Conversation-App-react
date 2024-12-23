import express from 'express'
import { getMessage } from '../controllers/message.js'

const messageRouter = express.Router()

messageRouter.get('/', getMessage)

export default messageRouter