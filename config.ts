import * as dotenv from 'dotenv'
dotenv.config()

export const config = {
  port: process.env.PORT || 3000,
  apiURL: process.env.API_URL,
  apiKey: process.env.API_KEY,
}
