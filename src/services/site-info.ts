import axios, { AxiosRequestConfig } from 'axios'
import { Request, Response } from 'express'
import { config } from '../../config'

// TODO
// The axios request will be deleted
// Instead of axios request we will use utils/internal-request for consistency

export const getInfo = async (req: Request, res: Response) => {
  const options: AxiosRequestConfig = {
    headers: {
      'x-api-key': req.headers['x-api-key'],
    },
  }
  const { info, error } = await axios
    .get<SiteInfo>(config.apiURL + '/site-info/' + req.params.siteId, options)
    .then(response => ({ info: response.data, error: undefined }))
    .catch(err => ({ info: undefined, error: { message: err.message } }))
  if (error) return res.status(404).json({ ...error })
  if (info) return res.status(200).json({ ...info })
}
