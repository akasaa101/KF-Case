import { Router } from 'express'
import { getAll } from '../services/outages'
import checkAuth from '../middlewares/check-auth'

const OutagesRouter = Router()

OutagesRouter.get('/', checkAuth, getAll)

export default OutagesRouter
