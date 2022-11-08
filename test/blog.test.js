const supertest = require("supertest")
const httpServer = require("../bin/www")
const mongoose = require('mongoose');
let token = ""
let id = ""
jest.setTimeout(30000)

/* Connecting to the database before each test. */
beforeAll(async () => {
    await mongoose.connect(process.env.DB_URL);

    const response = await supertest(httpServer)
    .post('/api/user/login')
    .send({ email: 'tee@tee.com', password: 'Password' })
    .expect(200)
    token = response.body.token
  });
  

  /* Closing database connection after each test. */
  afterAll(async () => {
    await mongoose.connection.close();
  });
  

describe("Blog Route", () => {
    it('GET /blog', async () => {
        const response = await supertest(httpServer).get("/api/blog")
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(3)
    })

    it('CREATE /blog', async () => {
        const blog = {
            "title": "Tent122",
            "description": "Story of Ten",
            "tags": ["Null"],
            "body" : "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        }
        const response = await supertest(httpServer)
        .post("/api/blog")
        .set({ Authorization: 'bearer ' + token, 'Content-Type': 'application/json' })
        .send(blog)  

        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.status).toBe(201)
        expect(response.body.data.title).toBe(blog.title)
        id = response.body.data._id
        
    })

    it('PUBLISH /blog/:id', async () => {
        const response = await supertest(httpServer)
        .patch(`/api/blog/${id}`)
        .set({ Authorization: 'bearer ' + token, 'Content-Type': 'application/json' })

        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.status).toBe(200)
        expect(response.body.data.state).toBe('published')
    })

    it('GET /blog/:id', async () => {
        const response = await supertest(httpServer)
        .get(`/api/blog/${id}`)
        .set({ Authorization: 'bearer ' + token, 'Content-Type': 'application/json' })

        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.status).toBe(200)
    })

    it('EDIT /blog/:id', async () => {
        const blogUpdate = {
            "title": "Tent112"
        }
        const response = await supertest(httpServer)
        .put(`/api/blog/${id}`)
        .set({ Authorization: 'bearer ' + token, 'Content-Type': 'application/json' })
        .send(blogUpdate)

        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.status).toBe(200)
        expect(response.body.data.title).toBe(blogUpdate.title)
    })

    it('DELETE /blog/:id', async () => {
        const response = await supertest(httpServer)
        .delete(`/api/blog/${id}`)
        .set({ Authorization: 'bearer ' + token, 'Content-Type': 'application/json' })

        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.status).toBe(200)
    })
})
