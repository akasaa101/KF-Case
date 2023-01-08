import { Router } from 'express'
import { getAll } from '../services/outages'

const OutagesRouter = Router()

OutagesRouter.get('/', getAll)

export default OutagesRouter
