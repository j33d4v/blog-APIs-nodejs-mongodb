const supertest = require("supertest")
const httpServer = require("../bin/www")
const mongoose = require('mongoose');

jest.setTimeout(30000)

/* Connecting to the database before each test. */
beforeAll(async () => {
    await mongoose.connect(process.env.DB_URL);
  });
  
  /* Closing database connection after each test. */
  afterAll(async () => {
    await mongoose.connection.close();
  });
  

describe("User Route", () => {
    it('POST /user/signup', async () => {
        const body = {
            "first_name": "Tee",
            "last_name": "eeT",
            "password": "Password",
            "email" : "example@example.com"
          }

        const response = await supertest(httpServer).post("/api/user/signup").send(body)
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.status).toBe(201)
        expect(response.body.data.first_name).toBe(body.first_name)
        expect(response.body.data.last_name).toBe(body.last_name)
        expect(response.body.data.email).toBe(body.email)
    })

    it('POST /user/login', async () => {
        const blog = {
            "password": "Password",
            "email" : "example@example.com"
        }
        const response = await supertest(httpServer).post("/api/user/login").send(blog)
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.status).toBe(200)
        expect(response.body.msg).toBe('You are successfully logged in')
    })

})