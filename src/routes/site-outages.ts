import { Router } from 'express'
import { createOutages } from '../services/site-outages'

const SiteOutagesRouter = Router()

SiteOutagesRouter.post('/:siteId', createOutages)

export default SiteOutagesRouter
