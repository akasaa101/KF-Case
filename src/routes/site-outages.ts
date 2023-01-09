import { Router } from 'express'
import { createOutages } from '../services/site-outages'
import checkAuth from '../middlewares/check-auth'

const SiteOutagesRouter = Router()

SiteOutagesRouter.post('/:siteId', checkAuth, createOutages)

export default SiteOutagesRouter
