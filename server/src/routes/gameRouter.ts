import { Hono } from "hono";


export const gameRouter = new Hono<{
  Bindings: {
    DATABASE_URL: String;
    JWT_SECRET: String;
  };
}>();

gameRouter.get("/game", async (c) => {
  return c.json({ msg: "cheaking if this working" });
});