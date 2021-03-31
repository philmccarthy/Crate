import request from 'supertest'; // import request library from supertest
import express from 'express'; // import express so we can create a mock server
import graphqlHTTP from 'express-graphql'; // import graphqlHTTP express library
import schema from '../../../setup/schema'; // import our graphql schema

// we create describe functions similar to RSpec
describe('user queries', async () => {
  let server = express();

  beforeAll(() => {
    server.use(
      "/",
      graphqlHTTP({
        schema: schema,
        graphiql: false
        })
      )
  });

  it('should return user styles', async(done) => {
    const response = await request(server)
      .post('/')
      .send({query: `{user(id: 2) {style}}`})
      .expect(200)

    expect(response.body).toMatchObject({
      data: {user: {style: null}}
    })
    expect(response.body.data.user.style).toEqual(null)
    done();
  })

  it('should be able to update style', async(done) => {
    const response = await request(server)
      .post('/')
      .send({query: `mutation { userStyle( id: 1, style: "cool" ) { style } }` })
      .expect(200)

    expect(response.body.data.userStyle.style).toBe("cool")
    done();
  })
})