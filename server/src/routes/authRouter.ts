import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import z from "zod"
import { hashpassword, validpassword } from "../bcrypt/hashing";
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
authRouter.post("/test", async (c) => {
  const body = await c.req.json();
  const username = body.username;
  const password = body.password;
  const dburi = c.env.DATABASE_URL;
  const jwtsecret = c.env.JWT_SECRET;

  try {
    const prisma = new PrismaClient({
        datasources: {db:{url: c.env.DATABASE_URL}},
        //@ts-ignore
        engine: {
            type: "library"
        },
    }).$extends(withAccelerate())

    const user = await prisma.user.findUnique({
        where: {
            email: username
        }
    })

    if(!user){
        return c.json({msg: "user not found"})
    }
    return c.json({user,dburi, jwtsecret });
    
  } catch (error) {
    console.log(error)
    return c.json({error,msg: "error in testss"
    })
    
  }

  }),



authRouter.post('/signup', async(c)=>{

    const prisma = new PrismaClient({
        datasources: {db: {url: c.env.DATABASE_URL}}
    }).$extends(withAccelerate())

    const body = await c.req.json()
    try {
        console.log(body)
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
            c.status(401)
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
        c.status(200)
         console.log(c.env.DATABASE_URL);
         console.log(c.env.JWT_SECRET);

        return c.json({msg: "user succesfully signup", token})
        
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
            c.status(400)
            return c.json({msg})
        }

        
        const existuser = await prisma.user.findUnique({
            where:{
                email: body.email,
            }
        })

        //@ts-ignore
        const validpass = await validpassword(body.password, existuser?.password) 
        console.log(validpass)
        
        if(!existuser || !validpass){
            c.status(401)
            return c.json({msg: "Invalid Credentials"})
        }
         //@ts-ignore
        const token = await sign(existuser.id, c.env.JWT_SECRET)

  setCookie(c, "token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 9999999,
  });
  c.status(200)

        return c.json({msg: "user signin successfully",token})




        
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




