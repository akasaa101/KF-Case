import axios, { AxiosRequestConfig } from 'axios'

const interval = () => {
  return new Promise<void>(resolve => {
    const s = setInterval(() => {
      clearInterval(s)
      resolve()
    }, 1000)
  })
}
const internalRequest = async (config: AxiosRequestConfig) => {
  let retry = 0
  while (retry !== 3) {
    const { data, error } = await axios(config)
      .then(response => ({ data: response.data, error: undefined }))
      .catch(err => ({
        data: undefined,
        error: { message: err.message, status: err.status },
      }))

    if (error && error.status === 500) {
      await interval()
      retry += 1
    }
    if (data) {
      return { data, error: undefined }
    }
  }
  return { data: undefined, error: { message: 'There is an error' } }
}

export default internalRequest
