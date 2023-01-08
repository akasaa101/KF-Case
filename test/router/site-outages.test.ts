import * as http from 'http'
import request from 'supertest'
import app from '../../src/app'

let server: http.Server

beforeAll(() => {
  server = app.listen()
})

afterAll(() => {
  server.close()
})

describe('POST /site-outages/{siteId}', () => {
  it('should return a status code of 200 with a valid api key and valid request body', async () => {
    const siteId = '44c02564-a229-4f51-8ded-cc7bcb202566'
    const payload = [
      {
        id: siteId,
        name: 'Partridge',
        begin: '2022-01-01T00:00:00.000Z',
        end: '2022-01-02T12:01:59.123Z',
      },
    ]

    const response = await request(app)
      .post(`/site-outages/${siteId}`)
      .set('x-api-key', 'EltgJ5G8m44IzwE6UN2Y4B4NjPW77Zk6FJK3lL23')
      .send(payload)

    expect(response.status).toBe(200)
  })
  it('should return 403 and an error message if API key is not valid', async () => {
    const siteId = '44c02564-a229-4f51-8ded-cc7bcb202566'
    const payload = [
      {
        id: siteId,
        name: 'Partridge',
        begin: '2022-01-01T00:00:00.000Z',
        end: '2022-01-02T12:01:59.123Z',
      },
    ]

    const response = await request(app)
      .post(`/site-outages/${siteId}`)
      .set('x-api-key', 'invalidApiKey')
      .send(payload)

    expect(response.status).toBe(403)
  })
  it('should return 404 and an error message if API key is valid but siteId is not valid', async () => {
    const siteId = 'invalidSiteId'
    const payload = [
      {
        id: siteId,
        name: 'Partridge',
        begin: '2022-01-01T00:00:00.000Z',
        end: '2022-01-02T12:01:59.123Z',
      },
    ]

    const response = await request(app)
      .post(`/site-outages/${siteId}`)
      .set('x-api-key', 'EltgJ5G8m44IzwE6UN2Y4B4NjPW77Zk6FJK3lL23')
      .send(payload)

    expect(response.status).toBe(404)
  })
})
