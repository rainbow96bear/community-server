import dotenv from "dotenv";

dotenv.config();

const corsOptions = {
  origin: process.env.COMMUNITY_URL,
  mmethods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  withCredentials: true,
};

export default corsOptions;
