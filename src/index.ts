import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import session from "express-session";
import corsOptions from "./config/corsOption";
import serverConfig from "./config/serverConfig";
import sessionOptions from "./config/sessionConfig";
import internalRoutes from "./routes/internal/index";
import externalRoutes from "./routes/external/index";
import db from "./models/index";
import { UserInfo } from "@_types/user";
import cookieParser from "cookie-parser";
import { initializeCategories } from "@_models/initialize";
dotenv.config();
declare module "express-session" {
  interface SessionData {
    cookie: Cookie;
    userInfo: UserInfo;
  }
}

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(session(sessionOptions));
app.use(morgan("combined"));
app.use(express.json());
app.use("/files", express.static("files"));

// API 요청 제한 설정
// const limiter = rateLimit({
//   windowMs: serverConfig.rateLimit.windowMs,
//   max: serverConfig.rateLimit.max,
//   message: "Too many requests from this IP, please try again later."
// });

// app.use(limiter);

app.use("/api/v1", externalRoutes);

// 내부 API 라우트 설정 (인증이 필요)
app.use(
  "/internal",
  // (req, res, next) => {
  //   // 인증 및 권한 확인 미들웨어
  //   // 예: if (!req.isAuthenticated()) return res.status(401).send('Unauthorized');
  //   next();
  // },
  internalRoutes
);

const port = serverConfig.port;
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await db.sequelize
    .authenticate()
    .then(async () => {
      await db.sequelize.sync({ force: false }).then();
      console.log("db connected");
      initializeCategories();
    })
    .catch((e: Error) => {
      console.log(e);
    });
});
