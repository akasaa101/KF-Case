import express, { Express, Request, Response } from 'express'
import logger from './logger'
const app: Express = express()

const port = 8000

app.get('/', (req: Request, res: Response) => {
  res.send('KF backend test case')
})

app.listen(port, () => {
  logger.info('Listening on port ' + port)
})
