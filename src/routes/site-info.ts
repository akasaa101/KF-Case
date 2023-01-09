import { Router } from 'express'
import { getInfo } from '../services/site-info'
import checkAuth from '../middlewares/check-auth'

const SiteInfoRouter = Router()

SiteInfoRouter.get('/:siteId', checkAuth, getInfo)

export default SiteInfoRouter
