import { Hono } from 'hono'
import { parentRoute } from './routes'
import { cors } from "hono/cors";


const app = new Hono()
const config = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use('/*',cors(config))



app.route("/server/v1",parentRoute)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
