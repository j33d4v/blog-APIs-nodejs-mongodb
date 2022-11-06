const supertest = require("supertest")
const httpServer = require("../bin/www")

jest.setTimeout(30000)


describe("Blog Route", () => {
    it('GET /blogs', async () => {
        const response = await supertest(httpServer).get("/api/blogs")
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(3)
    })

    it('POST /blogs', async () => {
        const blog = {
            "title": "Tent10",
            "description": "Story of Ten",
            "tags": ["Null"],
            "body" : "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        }
        const response = await supertest(httpServer).post("/api/blogs").send(blog)
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.status).toBe(201)
        expect(response.body.data.title).toBe(blog.title)
    })

    it('GET /blogs?id', async () => {
        const response = await supertest(httpServer).get("/api/blogs?id=1")
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.status).toBe(200)
        // expect(response.body.data.title).toBe('Blow Things Apart')
    })

    it('UPDATE /blogs?id', async () => {
        const blogUpdate = {
            "title": "Tent1"
        }
        const response = await supertest(httpServer).put("/api/blogs?id=1").send(blogUpdate)
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.status).toBe(200)
        expect(response.body.data.title).toBe(blogUpdate.title)
    })

    it('PUBLISH /blogs?id', async () => {
        const response = await supertest(httpServer).patch("/api/blogs?id=1")
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.status).toBe(200)
        // expect(response.body.data.title).toBe(blogUpdate.title)
    })

    it('DELETE /blogs?id', async () => {
        const response = await supertest(httpServer).patch("/api/blogs?id=1")
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.status).toBe(200)
        // expect(response.body.data.title).toBe(blogUpdate.title)
    })
})