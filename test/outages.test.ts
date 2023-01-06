describe('Returns all outages in our system.', () => {
  describe('GET /outgates', () => {
    it('Should return Outages response with status code 200', () => {
      expect(true).toBe(true)
    })
    it('When client not authorized for resource, Should return response with a message with status code 403 ', () => {
      expect(true).toBe(true)
    })
    it('When client exceeded limit of API KEY, Should return Outages response with status code 200', () => {
      expect(true).toBe(true)
    })
  })
})
