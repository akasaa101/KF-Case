import axios, { AxiosRequestConfig } from 'axios'
import { Request, Response } from 'express'
import { config } from '../../config'

// TODO
// The axios request will be deleted
// Instead of axios request we will use utils/internal-request for consistency

export const getAll = async (req: Request, res: Response) => {
  const options: AxiosRequestConfig = {
    headers: {
      'x-api-key': req.headers['x-api-key'],
    },
  }
  const { list, error } = await axios
    .get<[Outage]>(config.apiURL + '/outages', options)
    .then(({ data }) => ({ list: [...data], error: undefined }))
    .catch(err => ({ list: undefined, error: err }))
  if (error) return res.status(503).json({ error })
  if (list) return res.status(200).json([...list])
}
