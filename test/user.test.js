const supertest = require("supertest")
const httpServer = require("../bin/www")

jest.setTimeout(30000)


describe("User Route", () => {
    it('POST /users/signup', async () => {
        const body = {
            "first_name": "Tee",
            "last_name": "EET",
            "password": "Password",
            "email" : "tee@tee.com"
          }

        const response = await supertest(httpServer).post("/user/signup").send(body)
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.status).toBe(201)
        expect(response.body.data.first_name).toBe(body.first_name)
    })

    it('POST /users/login', async () => {
        const blog = {
            "password": "Password",
            "email" : "tee@tee.com"
        }
        const response = await supertest(httpServer).post("/users/login").send(blog)
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.status).toBe(200)
        expect(response.body.data.title).toBe(blog.title)
    })

})