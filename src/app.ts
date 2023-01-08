import express from 'express'
import { OutagesRouter, SiteInfoRouter, SiteOutagesRouter } from './routes'

const app = express()
app.get('/', (req, res) => {
  res.status(200).json({ sa: 'as' })
})
app.use('/outages', OutagesRouter)
app.use('/site-info', SiteInfoRouter)
app.use('/site-outages', SiteOutagesRouter)

export default app
