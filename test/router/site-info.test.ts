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

describe('GET /site-info/{siteId}', () => {
  it('should return 200 and It should return 200 and the correct site info for siteId "pear-tree" with a valid api key', async () => {
    const response = await request(server)
      .get('/site-info/pear-tree')
      .set('x-api-key', 'EltgJ5G8m44IzwE6UN2Y4B4NjPW77Zk6FJK3lL23')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('devices')
    expect(response.body.devices).toBeInstanceOf(Array)
    expect(response.body.id).toEqual('pear-tree')
    response.body.devices.forEach(device => {
      expect(device).toHaveProperty('id')
      expect(device).toHaveProperty('name')
    })
  })
  it('should return 403 and an error message if API key is not valid', async () => {
    const response = await request(server)
      .get('/site-info/pear-tree')
      .set('x-api-key', 'invalidApiKey')
      .expect(403)
    const body = response.body
    expect(body).toHaveProperty('message')
    expect(typeof body.message).toBe('string')
  })
  it('should return 404 and an error message if API key is valid but siteId is not valid', async () => {
    const response = await request(server)
      .get('/site-info/invalid-site-name')
      .set('x-api-key', 'EltgJ5G8m44IzwE6UN2Y4B4NjPW77Zk6FJK3lL23')
      .expect(404)
    const body = response.body
    expect(body).toHaveProperty('message')
    expect(typeof body.message).toBe('string')
  })
})
