import app from './src/app'
import logger from './logger'
const port = 3000
app.listen(port, () => {
  logger.info(`Server listening on port ${port}`)
})
