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

describe('GET /outages', () => {
  it('should return 200 and a list of outages if API key is valid and not exceeded limit', async () => {
    const response = await request(server)
      .get('/outages')
      .set('x-api-key', 'EltgJ5G8m44IzwE6UN2Y4B4NjPW77Zk6FJK3lL23')
      .expect(200)
    expect(Array.isArray(response.body)).toBe(true)

    const guidType = new RegExp(
      '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
      'i'
    )
    response.body.forEach(
      (item: { id: string; begin: string; end: string }) => {
        const { id, begin, end } = item
        expect(typeof id).toBe('string')
        expect(typeof begin).toBe('string')
        expect(typeof end).toBe('string')

        expect(new Date(begin) instanceof Date).toBe(true)
        expect(new Date(end) instanceof Date).toBe(true)
        expect(guidType.test(id)).toBe(true)
      }
    )
  })
  it('should return 403 and an error message if API key is not valid', async () => {
    const response = await request(server)
      .get('/outages')
      .set('x-api-key', 'invalidApiKey')
      .expect(403)
    const body = response.body
    expect(body).toHaveProperty('message')
    expect(typeof body.message).toBe('string')
  })
})
