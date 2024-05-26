import dotenv from "dotenv";

dotenv.config();

const serverConfig = {
  port: process.env.PORT || 8000,
};

export default serverConfig;
