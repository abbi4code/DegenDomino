import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const adminRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();


adminRouter.post('/signin',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())


    try {
        const body = await c.req.json()

        const admin = await prisma.admin.findUnique({
            where:{
                email: body.email,
                password: body.password
            }
        })
        if(!admin){
            return c.json({msg: "admin with this email not exist"})
        }

        return c.json({msg: "admin successfully signin"})
        
    } catch (error) {
        console.log(error)
        return c.json({msg:"error while admin signin"})
        
    }

})







