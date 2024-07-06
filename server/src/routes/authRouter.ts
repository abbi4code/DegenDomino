import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import z from "zod"
import { hashpassword } from "../bcrypt/hashing";
import { decode, sign, verify } from "hono/jwt";
import {
  getCookie,
  getSignedCookie,
  setCookie,
  setSignedCookie,
  deleteCookie,
} from "hono/cookie";

export const authRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

const signupInputs = z.object({
  email: z.string().email({ message: "invalid email" }),
  full_name: z
    .string()
    .min(5, { message: "name should be of 5 or characters" }),
  password: z.string().min(5, { message: "password should be of 5 or characters" }),

});
const signinInputs = z.object({
  email: z.string().email({ message: "invalid email" }),
  password: z.string().min(5, { message: "password should be of 5 or characters" }),

});

authRouter.post('/signup', async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    

    try {
        const body = await c.req.json()
        const validuser = signupInputs.safeParse(body)
        if(!validuser.success){
            const msg = validuser.error.errors.map((err) => err.message)
            c.status(404)
            return c.json({msg})
        }
        const existuser = await prisma.user.findUnique({
            where:{
                email: body.email
            }
        })
        if(existuser){
            c.status(404)
            return c.json({msg: "user already exist"})

        }

        const pass= await hashpassword(body.password)
        const user = await prisma.user.create({
            data:{
                email: body.email,
                password: pass,
                full_name: body.full_name
            }
        })
       //@ts-ignore
        const token = await sign(user.id , c.env.JWT_SECRET)
        console.log(user)

        setCookie(c, "token", token,{httpOnly: true,sameSite: "Lax",maxAge: 2000})
        c.status(200)

        return c.json({msg: "user succesfully signup", token,user})


        


        
    } catch (error) {
        console.log(error)
        c.status(403)
        return c.json({msg: "error while signup"})
        
    }



})


authRouter.post('/signin', async(c)=>{


    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json()

    try {
        const validuser = signinInputs.safeParse(body)
        if(!validuser.success){
            const msg = validuser.error.errors.map((err)=> err.message)
            c.status(404)
            return c.json({msg})
        }

        const existuser = await prisma.user.findUnique({
            where:{
                email: body.email
            }
        })
        if(!existuser){
            c.status(404)
            return c.json({msg: "user dont exist"})
        }
         //@ts-ignore
        const token = await sign(existuser.id, c.env.JWT_SECRET)

  setCookie(c, "token", token, {
    httpOnly: true,
    sameSite: "Lax",
    maxAge: 2000,
  });
  c.status(200)

        return c.json({msg: "user signin successfully", token,existuser})




        
    } catch (error) {
        console.log(error)
        c.status(403)
        return c.json({msg:"error while signin"})
        
    }
})

authRouter.post('/logout', async(c)=>{
   try {

    deleteCookie(c, "token")
    return c.json({msg:"succesfully logout"})
    
   } catch (error) {
    console.log(error)
    c.status(403)
    return c.json({msg: "error while logout"})

    
   }
})




