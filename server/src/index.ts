import { Hono } from 'hono'
import { parentRoute } from './routes'

const app = new Hono()



app.route("/server/v1",parentRoute)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
