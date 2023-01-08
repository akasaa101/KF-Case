import { Router } from 'express'
import { getInfo } from '../services/site-info'

const SiteInfoRouter = Router()

SiteInfoRouter.get('/:siteId', getInfo)

export default SiteInfoRouter
