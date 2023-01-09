import { Request, Response, NextFunction } from 'express'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { config } from '../../config'

const interval = () => {
  return new Promise<void>(resolve => {
    const s = setInterval(() => {
      clearInterval(s)
      resolve()
    }, 1000)
  })
}

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  let retry = 0
  while (retry !== 3) {
    const { status } = await axios
      .get(`${config.apiURL}`, {
        headers: { 'x-api-key': req.headers['x-api-key'] },
      })
      .then((data: AxiosResponse) => ({ status: data.status }))
      .catch((err: AxiosError) => ({ status: err.status }))
    if (status && status === 200) {
      next()
    } else if (status && status === 403) {
      res.status(403).json({
        message: 'Auth olamadın',
      })
    } else if (status && status === 500) {
      await interval()
      retry += 1
    } else {
      next()
    }
  }
}

export default checkAuth
