import { Hono } from "hono";


export const authRouter = new Hono<{
  Bindings: {
    DATABASE_URL: String;
    JWT_SECRET: String;
  };
}>();

authRouter.get('/signup', async(c)=>{
    return c.json({msg: "cheaking if this working"})

})

