# 🎮 Degen Domino

## 👉Project Description
This game website, built with React and Cloudflare Workers backend application, is designed to host multiple games, offering a diverse and entertaining experience for users. Currently, the website features "Mango Master," a thrilling game where players have 60 seconds to collect as many mangoes as possible using arrow keys or mouse controls. Players can compete for a spot on the leaderboard, with the top 10 scores displayed prominently. While "Mango Master" is the only game available now, the website is poised to expand with more exciting games in the future, providing endless fun and challenges for desktop users.


## 👉A Short Sneak Peek!

https://github.com/user-attachments/assets/ab058f17-2610-4a9a-b2da-ced538ac20c8

## ⚙️Tech Stacks Used
- Reactjs
- Tailwind
- Phaser
- TypeScript
- Hono
- Prisma
- Postgres
- Cloudflare Workers
- Zod

## 👉Features

1. **Responsive Game Website:**
   - Designed for optimal performance on desktop devices.
   - Future-proof with planned support for additional games.

2. **Current Game: Mango Master**
   - **Gameplay:**
     - Players have 60 seconds to collect as many mangoes as possible.
     - Use arrow keys for precise control (recommended) or mouse for movement.
   - **Scoring:(upcoming feature)**
     - Scores are recorded and displayed on a real-time leaderboard.
     - Top 10 scores are highlighted for competitive tracking.

3. **User-Friendly Interface:**
   - Intuitive and engaging UI/UX design for an immersive gaming experience.
   - Clear instructions and controls provided for each game.

4. **Leaderboard Integration:**
   - Displays top scores to encourage competitive play.
   - Real-time updates to reflect the latest high scores.

5. **Backend Powered by Cloudflare Workers:**
   - Robust and scalable backend infrastructure.
   - Efficient handling of game data and leaderboard updates.

6. **Future Expansion:**
   - Designed to support multiple games on the same platform.
   - Easily extensible to add new games and features.
   - 
7. **Security Features:**
   - Secure data handling to protect user information.
   - Reliable backend infrastructure ensuring minimal downtime.

## 👉Getting Started

Please follow these simple steps to get a local copy up and running.

### Server Side

- Create a copy of .env.example and name the file `.env`
- Set up Postgres DATABASE_URL in .env file. You can get a free PostgreSQL connection string from [Aiven.io](https://aiven.io/) or [Neon.tech](https://neon.tech/).
- Create a copy of wrangler.sample.toml and name the file `warngler.toml`
- Set up Prisma connection pool DATABASE_URL in wrangler.toml file. You can get this for free from [Prisma](https://www.prisma.io/data-platform/accelerate).
- Set up JWT Secret JWT_SECRET in wrangler.toml file. This can be any value.
- Login to ([cloudflare](https://www.cloudflare.com/)) and create a free account.
- Make sure you have logged in the cloudflare cli using npx wrangler login.
- Run npm run deploy

```bash 

cd backend
npm install
npm run prisma:migrate
npx prisma generate
npm run dev

```

> Note: wrangler.toml is the environment configuration file for a serverless backend. .env is used by Prisma for connection pooling. Ensure you configure both environment files accordingly.



### Client Side

- Navigate into the frontend directory using 
```bash

cd frontend
npm install
npm run dev

```

> Note: `frontend/src/config.ts` contains `backendUrl`. If you need your frontend to point to local backend server, uncomment `export const BackendUrl = "http://127.0.0.1:8787/server/v1"`. 



## ➡️ Coming Soon

- A leaderboard to showcase top players
- More games to come
- Live chat for online players to connect with each other


  

